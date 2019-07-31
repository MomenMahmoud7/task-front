import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { TiInfoLarge } from 'react-icons/ti';
import * as Yup from 'yup';
import './login.scss';

const Login = props => {
  const { handleUserStatus } = useContext(GlobalContext);

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
        signinError: ''
      }}
      validationSchema={loginSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setSubmitting(false);
        const { email, password } = values;
        const res = await fetch(
          'https://api-lb.herokuapp.com/api/users/login',
          {
            method: 'POST',
            body: JSON.stringify({
              email,
              password
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }
        );
        const loginResult = await res.json();
        console.log(loginResult);
        if (!loginResult.error) {
          console.log('no error');
        } else {
          const { code } = loginResult.error;
          if (code === 'INVALID_LOGIN') {
            setErrors({ signinError: 'Wrong username or password' });
          } else if (code === 'UNVERIFIED_PHONE') {
            handleUserStatus('phoneverification');
            props.history.push('/phoneverification');
          } else {
            handleUserStatus('emailverification');
            props.history.push('/emailverification');
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className='login-container'>
          <div className='login-header'>
            <h1>Sign In</h1>
          </div>
          <div className='login-body'>
            <div>
              <Field name='email' placeholder='Email' />
              <ErrorMessage name='email'>
                {name => (
                  <div className='error-icon'>
                    <TiInfoLarge size='28px' color='darkred' />
                    <div className='error-popup'>{name}</div>
                  </div>
                )}
              </ErrorMessage>
            </div>
            <div>
              <Field name='password' type='password' placeholder='Password' />
              <ErrorMessage name='password'>
                {name => (
                  <div className='error-icon'>
                    <TiInfoLarge size='28px' color='darkred' />
                    <div className='error-popup'>{name}</div>
                  </div>
                )}
              </ErrorMessage>
            </div>
            <div>
              <ErrorMessage name='signinError' component='div' />
            </div>
            <div>
              <button type='submit' disabled={isSubmitting}>
                Sign In
              </button>
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
