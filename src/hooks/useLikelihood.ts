import { useAnts } from '../api/useAnts';
import { useCallback, useEffect, useReducer } from 'react';
import { generateAntWinLikelihoodCalculator } from '../services/winLikelihoodCalculator';
import { CompetingAnt, PartialCalculationState } from '../domain/CompetingAnt';

type AggregatedCalculationState =
  | PartialCalculationState
  | { state: 'calculated' };

type Action =
  | { type: 'initAnts'; ants: CompetingAnt[] }
  | { type: 'startCalculation'; callback: (v: number, a: CompetingAnt) => void }
  | { type: 'oneFinished'; value: number; ant: CompetingAnt };

type ReducerState = {
  aggregatedState: AggregatedCalculationState;
  competingAnts: CompetingAnt[];
};

function stateReducer(state: ReducerState, action: Action): ReducerState {
  switch (action.type) {
    case 'startCalculation':
      state.competingAnts.forEach((a) =>
        a.calculator((v) => action.callback(v, a))
      );

      return {
        aggregatedState: { state: 'inProgress' },
        competingAnts: [
          ...state.competingAnts.map(
            (a) =>
              ({
                ...a,
                calculationState: { state: 'inProgress' },
              } as CompetingAnt)
          ),
        ],
      };
    case 'oneFinished':
      const ants = state.competingAnts
        .filter((v) => v.ant !== action.ant.ant)
        .concat({
          ...action.ant,
          calculationState: { state: 'calculated', value: action.value },
        });
      const aState: AggregatedCalculationState = ants.every(
        (a) => a.calculationState.state === 'calculated'
      )
        ? { state: 'calculated' }
        : { state: 'inProgress' };
      return { competingAnts: ants, aggregatedState: aState };
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
