import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { ApolloError, gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Button, Message, Alert } from 'rsuite';

import { Card } from '../components/Card';
import { Input, InputField, getValidationMessages } from '../components/Input';

import { Inputs } from './Types/Input';

// post user with mutation
const POST_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $full_name: String!
  ) {
    createUser(email: $email, password: $password, full_name: $full_name) {
      email
      user_profile {
        full_name
      }
    }
  }
`;

export function Register() {
  const [createUser, { error }] = useMutation(POST_USER);
  const [redirect, setRedirect] = useState<string>('');
  const { register, handleSubmit, errors } = useForm<Inputs>({});

  function onSubmit(data: Inputs) {
    createUser({
      variables: {
        email: data.email,
        password: data.password,
        full_name: data.fullname,
      },
    })
      .then((_data) => {
        Alert.success('Register Success.', 1000);
        setTimeout(() => {
          setRedirect('/');
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  function getErrorMessage(code: number) {
    switch (code) {
      case 11000:
        return 'Email telah digunakan';
      default:
        return 'error';
    }
  }

  function getErrorMessages(error: ApolloError): string[] {
    const errors: string[] = error.graphQLErrors.map((gqlErr) => {
      return getErrorMessage(gqlErr.extensions?.exception.code);
    });
    return errors;
  }

  return (
    <React.Fragment>
      <Title>Register</Title>
      <Card width="300px">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Message
              style={{ marginBottom: 20 }}
              showIcon
              type="error"
              description={getErrorMessages(error)}
            />
          )}
          {getValidationMessages(errors)}
          <Input
            name="fullname"
            ref={register({ required: true })}
            placeholder="Full Name"
          />
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
          <Button
            style={{ display: 'block', margin: 'auto' }}
            type="submit"
            appearance="primary"
          >
            Register
          </Button>
        </Form>
      </Card>
    </React.Fragment>
  );
}
const Title = styled.p`
  font-size: 20px;
  text-align: center;
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
