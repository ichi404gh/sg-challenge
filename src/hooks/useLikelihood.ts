import { useCallback, useEffect, useReducer } from 'react';
import * as O from 'optics-ts';

import { useAnts } from '../api/useAnts';
import { generateAntWinLikelihoodCalculator } from '../services/winLikelihoodCalculator';
import {
  AntCalculationState,
  CompetingAnt,
  PartialCalculationState,
} from '../domain/CompetingAnt';

type AggregatedCalculationState =
  | PartialCalculationState
  | { state: 'calculated' };

type InitAntsAction = { type: 'initAnts'; ants: CompetingAnt[] };

type StartCalculationAction = {
  type: 'startCalculation';
  callback: (v: number, a: CompetingAnt) => void;
};

type OneFinishedAction = {
  type: 'oneFinished';
  value: number;
  ant: CompetingAnt;
};

type Action = InitAntsAction | StartCalculationAction | OneFinishedAction;

type ReducerState = {
  aggregatedState: AggregatedCalculationState;
  competingAnts: CompetingAnt[];
};

function handleStartCalculation(
  state: ReducerState,
  action: StartCalculationAction
): ReducerState {
  state.competingAnts.forEach((a) =>
    a.calculator((v) => action.callback(v, a))
  );

  const allAntsState = O.optic_<ReducerState>()
    .prop('competingAnts')
    .elems()
    .prop('calculationState');

  const aggregatedStateLense = O.optic_<ReducerState>().prop('aggregatedState');
  const inProgressState: AggregatedCalculationState = {
    state: 'inProgress',
  };

  return O.pipe(
    state,
    O.set(allAntsState)({ state: 'inProgress' } as AntCalculationState),
    O.set(aggregatedStateLense)(inProgressState)
  );
}

function handleOneFinished(
  state: ReducerState,
  action: OneFinishedAction
): ReducerState {
  const updateAntState = O.optic_<CompetingAnt[]>()
    .filter((a) => a.ant === action.ant.ant)
    .elems()
    .prop('calculationState');

  const ants: CompetingAnt[] = O.set(updateAntState)({
    state: 'calculated',
    value: action.value,
  } as AntCalculationState)(state.competingAnts);

  const aggregatedState: AggregatedCalculationState = ants.every(
    (a) => a.calculationState.state === 'calculated'
  )
    ? { state: 'calculated' }
    : { state: 'inProgress' };
  return { competingAnts: ants, aggregatedState };
}

function stateReducer(state: ReducerState, action: Action): ReducerState {
  switch (action.type) {
    case 'startCalculation':
      return handleStartCalculation(state, action);
    case 'oneFinished':
      return handleOneFinished(state, action);
    case 'initAnts':
      return {
        aggregatedState: { state: 'notStarted' },
        competingAnts: action.ants,
      };
  }
}

const initialState: ReducerState = {
  aggregatedState: { state: 'notInitialized' },
  competingAnts: [],
};

export function useLikelihood() {
  const { ants, loading } = useAnts();
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    if (loading) return;

    const cAnts: CompetingAnt[] =
      ants?.map(
        (ant) =>
          ({
            ant,
            calculator: generateAntWinLikelihoodCalculator(),
            calculationState: { state: 'notStarted' },
          } as CompetingAnt)
      ) ?? [];
    dispatch({ type: 'initAnts', ants: cAnts });
  }, [ants, loading]);

  const calculate = useCallback(() => {
    dispatch({
      type: 'startCalculation',
      callback: (v, a) => dispatch({ type: 'oneFinished', value: v, ant: a }),
    });
  }, []);

  return { ants: state.competingAnts, state: state.aggregatedState, calculate };
}
