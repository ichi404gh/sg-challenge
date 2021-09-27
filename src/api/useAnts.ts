import { useQuery } from '@apollo/client';
import { Ants, Ants_ants } from '../schema/queries/types/Ants';
import { antsQuery } from '../schema/queries/ants';
import { useMemo } from 'react';
import { antFromQuery } from '../domain/Ant';

export const useAnts = () => {
  const { data, ...rest } = useQuery<Ants>(antsQuery);

  const ants = useMemo(() => {
    return data?.ants.filter((x): x is Ants_ants => !!x).map(antFromQuery);
  }, [data]);

  return { ants, ...rest };
};
