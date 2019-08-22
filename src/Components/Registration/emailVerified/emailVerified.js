import React from 'react';
import { Link } from 'react-router-dom';
import './emailVerified.scss';

const EmailVerified = () => {
  return (
    <div className='email-verified-container'>
      <h1>Sign up complete</h1>
      <p>
        Your email address has now been verified, you can now{' '}
        <Link to='/login'>log into your account</Link> using your email address
        and password.
      </p>
      <div className='image-container'>
        <div className='image' />
      </div>
    </div>
  );
};
export default EmailVerified;
