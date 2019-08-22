import React from 'react';
import './emailVerificationError.scss';

const EmailVerificationError = () => {
  return (
    <div className='email-verification-error-container'>
      <h1>Unable to validate email verification link</h1>
      <p>
        Your email verification link is either incorrect or expired, please
        check and make sure it is correct. If you are still experiencing
        problems contact Support team to activate your account.
      </p>
      <div className='image-container'>
        <div className='image' />
      </div>
    </div>
  );
};
export default EmailVerificationError;
