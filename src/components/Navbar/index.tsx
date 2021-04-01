import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function Navbar() {
  return (
    <Wrapper>
      <Title>Auth</Title>
      <Item>
        <Link to="/">Login</Link>
      </Item>
      <Item>
        <Link to="/about">About</Link>
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  width: 100vw;
  height: 3.5rem;
  align-items: center;
  background-color: #f8f9fa;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.p`
  color: ${(p) => p.theme.color.fontColor(0.7)};
  padding: 20px;
  font-size: 21px;
  font-weight: 500;
`;

const Item = styled.li`
  list-style: none;
  padding: 10px;
  a {
    text-decoration: none;
    color: ${(p) => p.theme.color.fontColor(0.5)};
    transition: 0.3s;
  }

  a:hover {
    color: ${(p) => p.theme.color.fontColor(1)};
  }
`;
