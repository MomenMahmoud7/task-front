import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GlobalContext = createContext({});

const GlobalProvider = props => {
  const [pending, setPending] = useState(false);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    const userId = localStorage.getItem('userId');
    setUserId(userId);
  }, []);

  const handleToken = token => {
    setToken(token);
    localStorage.setItem('token', token);
  };
  const handleUserId = userId => {
    setUserId(userId);
    localStorage.setItem('userId', userId);
  };
  const handleLogin = async (
    email,
    password,
    setErrors,
    handleSignupStatus,
    props
  ) => {
    try {
      const loginResult = await axios.post(
        'https://api-lb.herokuapp.com/api/users/login',
        {
          email,
          password
        }
      );
      setPending(false);
      handleUserId(loginResult.data.userId);
      handleToken(loginResult.data.id);
      props.history.push('/');
    } catch (error) {
      if (error.message !== 'Network Error') {
        setPending(false);
        const { code } = error.response.data.error;
        if (code === 'INVALID_LOGIN') {
          setErrors({ passwordAfter: 'Wrong password' });
        } else if (code === 'USER_NOT_FOUND') {
          setErrors({
            emailAfter: 'No account associated with this email address'
          });
        } else if (code === 'UNVERIFIED_PHONE') {
          handleSignupStatus('phone-verification');
          props.history.push('/phone-verification');
        } else {
          handleSignupStatus('email-verification');
          props.history.push('/email-verification');
        }
      } else {
        props.history.push('/not-found');
      }
    }
  };
  const handleLogout = async () => {
    setPending(true);
    await axios.post(
      'https://api-lb.herokuapp.com/api/users/logout',
      {},
      {
        headers: { Authorization: token }
      }
    );
    setPending(false);
    setToken('');
    setUserId('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <GlobalContext.Provider
      value={{
        pending,
        token,
        userId,
        setPending,
        handleToken,
        handleUserId,
        handleLogin,
        handleLogout
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
