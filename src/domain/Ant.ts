import { Ants_ants } from '../schema/queries/types/Ants';
import { AntColor } from '../schema/globalTypes';

export type Ant = {
  /**
   * The color of the ant
   */
  color: AntColor;
  /**
   * The length of the ant in millimetres
   */
  length: number;
  /**
   * The name of the ant
   */
  name: string;
  /**
   * The weigt of the ant in milligrams
   */
  weight: number;
};

export function antFromQuery(qa: Ants_ants): Ant {
  return {
    name: qa.name,
    color: qa.color,
    length: qa.length,
    weight: qa.weight,
  };
}
