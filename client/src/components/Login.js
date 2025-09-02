import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('User Info:', decoded);

    // Optionally store in localStorage
    localStorage.setItem('user', JSON.stringify(decoded));

    // Redirect to dashboard
    navigate('/dashboard');
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div style={styles.container}>
      <h2>Login to AI Quiz Builder</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1rem',
  },
};
