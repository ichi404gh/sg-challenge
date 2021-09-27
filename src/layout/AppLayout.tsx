import styled from 'styled-components';

interface Props {
  children: JSX.Element;
}

const Page = styled.section`
  max-width: 800px;
  margin: 0 auto;
`;

export function AppLayout(props: Props) {
  return <Page>{props.children}</Page>;
}
