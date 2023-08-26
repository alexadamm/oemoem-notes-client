import React, { Component } from 'react';
import Router from 'next/router';
import { fetchWithAuthentication } from '../../lib/utils/fetcher';
import { getBaseURL } from '../../lib/utils/storage';

class Logout extends Component {
  async componentDidMount() {
    try {
      await fetchWithAuthentication(`${getBaseURL()}authentications`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.removeItem('accessToken');
      await Router.push('/login');
    } catch (error) {
      if (window) {
        alert(error.message);
      }
    }
  }

  render() {
    return (
      <></>
    );
  }
}

export default Logout;
