import { Card } from '../components/Card';
import styled from 'styled-components';
import { Form, FormGroup, Button, FormControl, ButtonToolbar } from 'rsuite';
import React from 'react';
import { Link } from 'react-router-dom';

export function Auth() {
  return (
    <React.Fragment>
      <Title>Login</Title>
      <Card width="300px">
        <Form fluid>
          <FormGroup>
            <FormControl placeholder="Email" name="email" type="email" />
          </FormGroup>
          <FormGroup>
            <FormControl
              placeholder="Password"
              name="password"
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <ButtonToolbar>
              <Button appearance="primary">Login</Button>
            </ButtonToolbar>
          </FormGroup>
        </Form>
        <Register>
          No account ? <Link to="/register">Create One</Link>
        </Register>
      </Card>
    </React.Fragment>
  );
}

const Title = styled.p`
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
`;

const Register = styled.p`
  margin-top: 20px;
`;
