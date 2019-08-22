import React from 'react';
import './emailVerification.scss';

const EmailVerification = () => {
  return (
    <div className='email-verification-container '>
      <h1>Email address verification</h1>
      <p>
        Please verify the email address that you have provided for sign up in
        order for us to activate your account. We've sent you an email with
        instructions.
      </p>
      <div className='image-container'>
        <div className='image' />
      </div>
    </div>
  );
};
export default EmailVerification;
