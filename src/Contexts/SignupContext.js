import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SignupContext = createContext({});

const SignupProvider = props => {
  const [userData, setUserData] = useState({});
  const [signupStatus, setSignupStatus] = useState('');
  const [requestId, setRequestId] = useState('');
  const [userId, setUserId] = useState('');
  const [pending, setPending] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const signupStatus = localStorage.getItem('signupStatus');
    setSignupStatus(signupStatus);
    const requestId = localStorage.getItem('requestId');
    setRequestId(requestId);
  }, []);

  const handleSignupStatus = signupStatus => {
    setSignupStatus(signupStatus);
    localStorage.setItem('signupStatus', signupStatus);
  };
  const handleRequestId = requestId => {
    setRequestId(requestId);
    localStorage.setItem('requestId', requestId);
  };
  const handleUserId = userId => {
    setUserId(userId);
    localStorage.setItem('userId', userId);
  };
  const handleSignup = async (
    firstName,
    lastName,
    username,
    phoneNumber,
    password,
    confirmPassword,
    email,
    setErrors,
    props
  ) => {
    try {
      const signupResult = await axios.post(
        'https://api-lb.herokuapp.com/api/users',
        {
          firstName,
          lastName,
          username,
          phoneNumber,
          password,
          confirmPassword,
          email,
        }
      );
      setPending(false);
      handleSignupStatus('phone-verification');
      handleRequestId(signupResult.requestID);
      handleUserId(signupResult.id);
      props.history.push('/phone-verification');
    } catch (error) {
      const { details } = error.response.data.error;
      setPending(false);
      setErrors({
        emailAfter: details.includes('email') ? 'Email is already exist' : '',
        phoneNumberAfter: details.includes('phone')
          ? 'Phone is already exist'
          : '',
        usernameAfter: details.includes('username')
          ? 'Username has already been taken'
          : ''
      });
    }
  };

  return (
    <SignupContext.Provider
      value={{
        userData,
        setUserData,
        pending,
        setPending,
        uploading,
        handleSignup
      }}
    >
      {props.children}
    </SignupContext.Provider>
  );
};
export default SignupProvider;
