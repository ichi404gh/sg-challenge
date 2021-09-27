import { AntCard } from './components/AntCard';
import { useLikelihood } from '../../hooks/useLikelihood';
import { useMemo } from 'react';

export function AntsPage() {
  const { ants, state, calculate } = useLikelihood();

  const calculated = useMemo(
    () =>
      ants
        .filter((a) => a.calculationState.state === 'calculated')
        .sort((a, b) => {
          if (
            a.calculationState.state !== 'calculated' ||
            b.calculationState.state !== 'calculated'
          )
            return 0;
          return b.calculationState.value - a.calculationState.value;
        }),
    [ants]
  );

  const notStarted = useMemo(
    () => ants.filter((a) => a.calculationState.state === 'notStarted'),
    [ants]
  );
  const inProgress = useMemo(
    () => ants.filter((a) => a.calculationState.state === 'inProgress'),
    [ants]
  );

  if (state.state === 'notInitialized') {
    return <div>loading...</div>;
  }

  return (
    <div>
      <button onClick={() => calculate()}>Start calculation</button>
      <p>
        Calculation state:{' '}
        {state.state === 'calculated'
          ? 'Calculated'
          : state.state === 'notStarted'
          ? 'Not started'
          : state.state === 'inProgress'
          ? 'In progress...'
          : 'Loading...'}
      </p>
      {calculated.length > 0 && (
        <>
          <h3>Calculated</h3>
          {calculated.map((a) => (
            <AntCard key={a.ant.name} ant={a} />
          ))}
        </>
      )}
      {notStarted.length > 0 && (
        <>
          <h3>Not Started</h3>
          {notStarted.map((a) => (
            <AntCard key={a.ant.name} ant={a} />
          ))}
        </>
      )}
      {inProgress.length > 0 && (
        <>
          <h3>In progress</h3>
          {inProgress.map((a) => (
            <AntCard key={a.ant.name} ant={a} />
          ))}
        </>
      )}
    </div>
  );
}
