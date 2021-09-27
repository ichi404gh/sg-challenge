import { gql } from '@apollo/client';

export const antsQuery = gql`
  query Ants {
    ants {
      color
      length
      name
      weight
    }
  }
`;
