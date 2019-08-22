import React from 'react';
import './post.scss';

const Post = ({ firstName, lastName, username, text, privacy }) => {
  return (
    <div className='post-container'>
      <div className='post-header'>
        <div>{`${firstName} ${lastName}`}</div>
        <div className='username'> {`@${username}`}</div>
      </div>
      <div className='post-body'>{text}</div>
    </div>
  );
};
export default Post;
