import styled from 'styled-components';

export function NotFound() {
  return <Title>404. Page Not Found😢</Title>;
}

const Title = styled.p`
  margin-top: 30px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;
