import React from 'react';

export default function post({ firstName, lastName, text, privacy }) {
  return (
    <div>
      <p className='post-owner'>
        {firstName} {lastName}
      </p>
      <p className='post-text'>{text}</p>
    </div>
  );
}
