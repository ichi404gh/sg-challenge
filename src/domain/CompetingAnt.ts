import { Ant } from './Ant';

export interface CompetingAnt {
  readonly ant: Ant;
  readonly calculator: (callback: (likelihood: number) => void) => void;
  calculationState: AntCalculationState;
}

export type PartialCalculationState =
  | { state: 'notInitialized' }
  | { state: 'notStarted' }
  | { state: 'inProgress' };

type AntCalculationState =
  | PartialCalculationState
  | { state: 'calculated'; value: number };
