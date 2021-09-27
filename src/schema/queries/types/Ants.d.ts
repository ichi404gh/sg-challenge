/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AntColor } from "./../../globalTypes";

// ====================================================
// GraphQL query operation: Ants
// ====================================================

export interface Ants_ants {
  __typename: "Ant";
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
}

export interface Ants {
  /**
   * A list of competing ants
   */
  ants: (Ants_ants | null)[];
}
