import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { SignupContext } from '../../Contexts/SignupContext';
import { TiWarning, TiDelete, TiChevronRight } from 'react-icons/ti';
import ClipLoader from 'react-spinners/ClipLoader';
import * as Yup from 'yup';
import './login.scss';
import Facebook from './facebook';

const Login = props => {
  const { handleLogin } = useContext(GlobalContext);
  const { handleSignupStatus } = useContext(SignupContext);
  const [pending, setPending] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string().required('Required')
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        emailAfter: '',
        passwordAfter: ''
      }}
      validationSchema={loginSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setSubmitting(false);
        setPending(true);
        const { email, password } = values;
        handleLogin(email, password, setErrors, handleSignupStatus, props);
      }}
    >
      {({ isSubmitting }) => (
        <Form className='login-container'>
          <div className='login-header'>
            <h2>Log In</h2>
          </div>
          <div className='login-body'>
            <div className='input-container'>
              <Field name='email' placeholder='Email' />
              <ErrorMessage name='email'>
                {name => (
                  <div className='error-icon'>
                    <TiWarning size='24px' color='yellow' />
                    <div className='error-popup warning'>{name}</div>
                  </div>
                )}
              </ErrorMessage>
              <ErrorMessage name='emailAfter'>
                {name => (
                  <div className='error-icon'>
                    <TiDelete size='24px' color='red' />
                    <div className='error-popup'>{name}</div>
                  </div>
                )}
              </ErrorMessage>
            </div>
            <div className='input-container'>
              <Field name='password' type='password' placeholder='Password' />
              <ErrorMessage name='password'>
                {name => (
                  <div className='error-icon'>
                    <TiWarning size='24px' color='yellow' />
                    <div className='error-popup warning'>{name}</div>
                  </div>
                )}
              </ErrorMessage>
              <ErrorMessage name='passwordAfter'>
                {name => (
                  <div className='error-icon'>
                    <TiDelete size='24px' color='red' />
                    <div className='error-popup'>{name}</div>
                  </div>
                )}
              </ErrorMessage>
            </div>
            <div>
              <ErrorMessage name='signinError' component='div' />
            </div>
            <div className='input-container button-container'>
              <button type='submit' disabled={isSubmitting}>
                <div className='button-action'>Login</div>
                <div className='button-label'>
                  {pending ? (
                    <ClipLoader sizeUnit={'px'} size={24} color={'#1DA1F2'} />
                  ) : (
                    <TiChevronRight size='1.4em' />
                  )}
                </div>
              </button>
            </div>
            <div className='social'>
              <div className='or'>Or</div>
              <Facebook />
            </div>
            Don't have an account? &nbsp;&nbsp;
            <br />
            <Link to='/signup'>Sign Up</Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
