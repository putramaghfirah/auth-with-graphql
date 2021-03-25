import React, { useState } from 'react';
import { Card } from '../components/Card';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { Form, FormGroup, Button, FormControl, ButtonToolbar } from 'rsuite';
import { Redirect } from 'react-router-dom';
import { Alert } from 'rsuite';

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
  const [createUser] = useMutation(POST_USER);
  const [redirect, setRedirect] = useState<string>('');
  // const onSubmit = (_status: boolean, value: any) => console.log(value);
  function onSubmit(_status: boolean, event: any) {
    createUser({
      variables: {
        email: event.target[1].value,
        password: event.target[2].value,
        full_name: event.target[0].value,
      },
    })
      .then((data) => {
        // console.log(data);
        Alert.success('Register Success.', 1000);
        setTimeout(() => {
          setRedirect('/');
        }, 2000);
      })
      .catch((error) => {
        Alert.error('Register Failed.', 1000);
        console.log(error);
      });
  }

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <React.Fragment>
      <Title>Register</Title>
      <Card width="300px">
        <Form onSubmit={onSubmit} fluid>
          <FormGroup>
            <FormControl placeholder="Full Name" name="name" />
          </FormGroup>
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
