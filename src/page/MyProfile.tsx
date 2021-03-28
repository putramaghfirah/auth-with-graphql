import React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { Loader } from 'rsuite';
import { Helmet } from 'react-helmet';

const GET_PROFILE = gql`
  query GetProfile {
    myProfile {
      email
      user_profile {
        full_name
      }
    }
  }
`;
export function MyProfile() {
  const { data, loading, error } = useQuery(GET_PROFILE);
  if (loading) {
    return <Loader center={true} content="Loading..." />;
  }
  if (error) {
    return <Loading>Error...{error.message}</Loading>;
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <h1>{data.myProfile.email}</h1>
      <h1>{data.myProfile.user_profile.full_name}</h1>
    </React.Fragment>
  );
}

const Loading = styled.p`
  text-align: center;
`;
