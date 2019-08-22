import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TiWarning, TiDelete, TiArrowSortedDown } from 'react-icons/ti';
import ClipLoader from 'react-spinners/ClipLoader';
import * as Yup from 'yup';
import './signup.scss';
import { SignupContext } from '../../../Contexts/SignupContext';
// import CodeVerification from '../codeVerification/codeVerification';

const Signup = props => {
  const {
    pending,
    setPending,
    uploading,
    setUploading,
    handleSignup
  } = useContext(SignupContext);

  const phoneNumberValid = /^\+?[0-9]{3}-?[0-9]{6,12}$/;

  const signupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'Too Short!')
      .max(30, 'Too Long!')
      .matches(/^[a-zA-Z]+$/, 'Only Letters')
      .required('Required'),
      lastName: Yup.string()
      .min(3, 'Too Short!')
      .max(30, 'Too Long!')
      .matches(/^[a-zA-Z]+$/, 'Only Letters')
      .required('Required'),
      username: Yup.string()
      .min(3, 'Too Short!')
      .max(30, 'Too Long!')
      .matches(/^[a-zA-Z0-9_]+$/,'Only Letters, Numbers & Underscores')
      .required('Required'),
    phoneNumber: Yup.string()
      .matches(phoneNumberValid, 'Invalid phone number')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(8, '8 charactars minimum')
      .matches(/(?=.*[a-z])/, 'At least 1 lowercase')
      .matches(/(?=.*[A-Z])/, 'At least 1 UPPERCASE')
      .matches(/(?=.*[0-9])/, 'At least 1 Number')
      .matches(
        /(?=.[!?._@#\$%\^&])/,
        'At least one special character (!?._@#$%^&)'
      )
      .required('Required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    )
  });
  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          email: '',
          emailAfter: '',
          phoneNumberAfter: '',
          usernameAfter: ''
        }}
        validationSchema={signupSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(false);
          setPending(true);
          const {
            firstName,
            lastName,
            username,
            phoneNumber,
            password,
            confirmPassword,
            email
          } = values;

          handleSignup(
            firstName,
            lastName,
            username,
            phoneNumber,
            password,
            confirmPassword,
            email,
            setErrors,
            props
          );
        }}
      >
        {({ isSubmitting }) => (
          <>
            <Form className='signup-container'>
              <div className='signup-header'>
                <h2>Sign Up</h2>
                <p>Please fill in this form to create an account!</p>
              </div>
              <div className='signup-body'>
                <div className='input-container'>
                  <Field name='firstName' placeholder='First Name' />
                  <ErrorMessage name='firstName'>
                    {name => (
                      <div className='error-icon'>
                        <TiWarning size='24px' color='yellow' />
                        <div className='error-popup warning'>{name}</div>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className='input-container'>
                  <Field name='lastName' placeholder='Last Name' />
                  <ErrorMessage name='lastName'>
                    {name => (
                      <div className='error-icon'>
                        <TiWarning size='24px' color='yellow' />
                        <div className='error-popup warning'>{name}</div>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className='input-container'>
                  <Field name='username' placeholder='User Name' />
                  <ErrorMessage name='username'>
                    {name => (
                      <div className='error-icon'>
                        <TiWarning size='24px' color='yellow' />
                        <div className='error-popup warning'>{name}</div>
                      </div>
                    )}
                  </ErrorMessage>
                  <ErrorMessage name='usernameAfter'>
                    {name => (
                      <div className='error-icon'>
                        <TiDelete size='24px' color='red' />
                        <div className='error-popup'>{name}</div>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className='input-container'>
                  <Field
                    name='phoneNumber'
                    type='tel'
                    placeholder='Phone Number'
                  />
                  <ErrorMessage name='phoneNumber'>
                    {name => (
                      <>
                        <div className='error-icon'>
                          <TiWarning size='24px' color='yellow' />
                          <div className='error-popup warning'>{name}</div>
                        </div>
                      </>
                    )}
                  </ErrorMessage>
                  <ErrorMessage name='phoneNumberAfter'>
                    {name => (
                      <>
                        <div className='error-icon'>
                          <TiDelete size='24px' color='red' />
                          <div className='error-popup'>{name}</div>
                        </div>
                      </>
                    )}
                  </ErrorMessage>
                </div>
                <div className='input-container email-container'>
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
                <div className='input-container upload-container'>
                  <button>
                    <div className='button-action'>Profile Picture</div>
                    <div className='button-label'>
                      {uploading ? (
                        <ClipLoader
                          sizeUnit={'px'}
                          size={24}
                          color={'#1df276'}
                        />
                      ) : (
                        <TiArrowSortedDown size='1.4em' />
                      )}
                    </div>
                    <input type='file' />
                  </button>
                </div>
                <div className='input-container'>
                  <Field
                    name='password'
                    type='password'
                    placeholder='Password'
                  />
                  <ErrorMessage name='password'>
                    {name => (
                      <div className='error-icon'>
                        <TiWarning size='24px' color='yellow' />
                        <div className='error-popup warning'>{name}</div>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className='input-container'>
                  <Field
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirm Password'
                  />
                  <ErrorMessage name='confirmPassword'>
                    {name => (
                      <div className='error-icon'>
                        <TiWarning size='24px' color='yellow' />
                        <div className='error-popup warning'>{name}</div>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className='input-container button-container'>
                  <button type='submit' disabled={isSubmitting}>
                    <div className='button-action'>
                      {pending ? (
                        <ClipLoader
                          sizeUnit={'px'}
                          size={24}
                          color={'#000f23'}
                        />
                      ) : null}
                      Sign Up
                    </div>
                  </button>
                </div>
                Already have an account? &nbsp;&nbsp;
                <Link to='/login'>Log In</Link>
              </div>
            </Form>
          </>
        )}
      </Formik>
      {/* <CodeVerification /> */}
    </>
  );
};
export default Signup;
