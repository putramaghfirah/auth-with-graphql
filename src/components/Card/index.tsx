import styled from 'styled-components';

type Cards = {
  width?: string;
  height?: string;
  children?: React.ReactNode;
};

export function Card({ width, height, children }: Cards) {
  return (
    <Container height={height} width={width}>
      {children}
    </Container>
  );
}

const Container = styled.div<{ width?: string; height?: string }>`
  padding: 20px;
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  text-align: center;
  margin: 20px auto;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition: 0.4s ease-in-out;
  color: ${(p) => p.theme.color.fontColor(1)};
  :hover {
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    border: transparent;
  }
`;
