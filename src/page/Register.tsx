import React, { useState } from 'react';
import { Card } from '../components/Card';
import styled from 'styled-components';
import { ApolloError, gql, useMutation } from '@apollo/client';
import {
  Schema,
  Form,
  FormGroup,
  Button,
  FormControl,
  ButtonToolbar,
} from 'rsuite';
import { Redirect } from 'react-router-dom';
import { Alert, Message } from 'rsuite';

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

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),
  password: StringType().isRequired('This field is required.'),
});

function TextField(props: any) {
  const { name, accepter, ...rest } = props;
  return (
    <FormGroup>
      <FormControl name={name} accepter={accepter} {...rest} />
    </FormGroup>
  );
}

export function Register() {
  const [createUser, { error }] = useMutation(POST_USER);
  const [redirect, setRedirect] = useState<string>('');

  function onSubmit(_status: boolean, event: any) {
    createUser({
      variables: {
        email: event.target[1].value,
        password: event.target[2].value,
        full_name: event.target[0].value,
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
        <Form onSubmit={onSubmit} model={model} fluid>
          {error && (
            <Message
              style={{ marginBottom: 20 }}
              showIcon
              type="error"
              description={getErrorMessages(error)}
            />
          )}
          <TextField name="name" placeholder="Full Name" />
          <TextField name="email" placeholder="Email" type="email" />
          <TextField name="password" placeholder="Password" type="password" />
          <FormGroup>
            <ButtonToolbar>
              <Button type="submit" appearance="primary">
                Register
              </Button>
            </ButtonToolbar>
          </FormGroup>
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
