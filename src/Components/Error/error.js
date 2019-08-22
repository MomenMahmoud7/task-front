import React from 'react';
import './error.scss';
const Error = () => {
  return (
    <div className='notfound'>
      <div className='notfound-404'>
        <h1>Oops!</h1>
        <h2>Something went wrong</h2>
        <h2>Please check your internet connection</h2>
      </div>
      <a href='/'>Go to Homepage</a>
    </div>
  );
};
export default Error;
