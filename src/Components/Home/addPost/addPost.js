import React, { useState, useContext } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { TiFlash } from 'react-icons/ti';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './addPost.scss';
import axios from 'axios';
import { GlobalContext } from '../../../Contexts/GlobalContext';

const AddPost = props => {
  const [pending, setPending] = useState(false);
  const { token, userId } = useContext(GlobalContext);
  return (
    <Formik
      initialValues={{
        post: ''
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        setPending(true);
        try {
          await axios.post(
            `https://api-lb.herokuapp.com/api/users/${userId}/posts`,
            {
              text: values.post,
              privacy: 'public'
            },
            {
              headers: { Authorization: token }
            }
          );
          setPending(false);
        } catch (error) {
          if(error.message === 'Network Error')
          if (error) props.history.push('/not-found');
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className='add-post-container'>
          <div className='add-post-header'>Create Post</div>
          <Field
            name='post'
            component='textarea'
            placeholder='What is in your head ?'
          />
          <div className='button-container'>
            <button type='submit' disabled={isSubmitting}>
              <div className='button-action'>Post</div>
              <div className='button-label'>
                {pending ? (
                  <ClipLoader sizeUnit={'px'} size={24} color={'#1DA1F2'} />
                ) : (
                  <TiFlash size='1.4em' />
                )}
              </div>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default AddPost;
