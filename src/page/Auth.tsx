import React from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { Form, FormGroup, Button, FormControl, ButtonToolbar } from 'rsuite';
import { gql, useLazyQuery } from '@apollo/client';

import { Card } from '../components/Card';

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
export function Auth() {
  const [login, { data }] = useLazyQuery(LOGIN);

  function onSubmit(_status: boolean, value: any) {
    login({
      variables: {
        email: value.target[0].value,
        password: value.target[1].value,
      },
    });
  }
  if (data) {
    localStorage.setItem('token', data.login);
    return <Redirect to="/myprofile" />;
  }
  return (
    <React.Fragment>
      <Title>Login</Title>
      <Card width="300px">
        <Form fluid onSubmit={onSubmit}>
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
              <Button type="submit" appearance="primary">
                Login
              </Button>
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
