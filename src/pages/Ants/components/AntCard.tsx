import { Card, CardSection } from './ui';
import { CompetingAnt } from '../../../domain/CompetingAnt';

interface Props {
  ant: CompetingAnt;
}

export function AntCard(props: Props) {
  const { ant } = props;

  return (
    <Card>
      <CardSection>
        <h3>Ant</h3>
        <p>Name: {ant.ant.name}</p>
        <p>Length: {ant.ant.length}mm</p>
        <p>Weight: {ant.ant.weight}mg</p>
        <p>Color: {ant.ant.color}</p>
      </CardSection>

      <CardSection>
        <h3>Competition</h3>
        {ant.calculationState.state === 'calculated' && (
          <p>Done: {(ant.calculationState.value * 100).toFixed(2)}%</p>
        )}
        {ant.calculationState.state === 'inProgress' && <p>In progress...</p>}
        {ant.calculationState.state === 'notStarted' && <p>Not started</p>}
      </CardSection>
    </Card>
  );
}
