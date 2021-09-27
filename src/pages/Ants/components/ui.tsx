import styled from 'styled-components';

export const Card = styled.div`
  margin: 20px 10px;
  padding: 5px 10px;
  border: #00000055 1px solid;
  box-shadow: 0 10px 10px -9px black;
  display: flex;
  & p {
    margin: 0.2em;
  }
`;

export const CardSection = styled.section`
  flex-basis: 50%;
  padding-right: 20px;
`;
