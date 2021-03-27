import React from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Message, Button } from 'rsuite';

import { Card } from '../components/Card';
import { Input, InputField, getValidationMessages } from '../components/Input';

import { Inputs } from './Types/Input';

// getuser with query graphql
const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export function Auth() {
  const [login, { data, error }] = useLazyQuery(LOGIN);
  const { register, handleSubmit, errors } = useForm<Inputs>({});

  function onSubmit(data: Inputs) {
    login({
      variables: {
        email: data.email,
        password: data.password,
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Message
              style={{ marginBottom: 20 }}
              showIcon
              type="error"
              description="Login gagal"
            />
          )}
          {getValidationMessages(errors)}
          <Input
            name="email"
            ref={register({ required: true })}
            type="email"
            placeholder="Email"
          />
          <Input
            name="password"
            ref={register({ required: true })}
            type="password"
            placeholder="Password"
          />
          <Button type="submit" appearance="primary">
            Login
          </Button>
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

const Form = styled.form`
  ${InputField} {
    margin: auto;
    margin-bottom: 15px;
    transition: 0.3s ease-in-out;
  }

  ${InputField}:hover {
    border: 1px solid rgb(33, 123, 225);
  }

  ${InputField}:focus {
    border: 1px solid rgb(33, 123, 225);
    border-radius: 6px;
    outline: none;
  }
`;
