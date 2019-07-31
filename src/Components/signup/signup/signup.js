import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GlobalContext } from '../../../Contexts/GlobalContext';
import { FaExclamationCircle } from 'react-icons/fa';
import { MdPersonAdd } from 'react-icons/md';
import * as Yup from 'yup';
import './signup.scss';

const Signup = props => {
    const { handleUserStatus, handleRequestId } = useContext(GlobalContext);

    const phoneNumberValid = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    const signupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Too Long!')
            .matches(/^[a-zA-Z']+$/, '')
            .required('Required'),
        lastName: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Required'),
        username: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Too Long!')
            .matches(/^\w+$/, 'Only Letters, Numbers & Underscores')
            .required('Required'),
        phoneNumber: Yup.string()
            .matches(phoneNumberValid, 'Phone number is not valid')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Password should be 8 chars minimum.')
            .matches(/(?=.*[a-z])/, 'Must contain at least 1 lowercase')
            .matches(/(?=.*[A-Z])/, 'Must contain at least 1 UPPERCASE')
            .matches(/(?=.*[0-9])/, 'Must contain at least 1 Number')
            .matches(
                /(?=.[!@#\$%\^&])/,
                'Must contain at least one special character(?=.[!@#$%^&)'
            )
            .required('Required'),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match'
        )
    });
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                username: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
                email: '',
                emailError: '',
                phoneError: '',
                usernameError: ''
            }}
            validationSchema={signupSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                setSubmitting(false);
                // handleUserStatus('phoneVerification');
                // handleRequestId('15468641');
                const {
                    firstName,
                    lastName,
                    username,
                    phoneNumber,
                    password,
                    confirmPassword,
                    email
                } = values;
                fetch('https://api-lb.herokuapp.com/api/users', {
                    method: 'POST',
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        username,
                        phoneNumber,
                        password,
                        confirmPassword,
                        email
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (!data.error) {
                            handleUserStatus('phoneVerification');
                            handleRequestId(data.requestID);
                        } else {
                            setErrors({
                                emailError: data.error.details.includes('email')
                                    ? 'Email is already exist'
                                    : null,
                                phoneError: data.error.details.includes('phone')
                                    ? 'Phone is already exist'
                                    : null,
                                usernameError: data.error.details.includes(
                                    'username'
                                )
                                    ? 'Username is already exist'
                                    : null
                            });
                        }
                    });
            }}
        >
            {({ isSubmitting }) => (
                <Form className='signup-container'>
                    <div className='signup-header'>
                        <h1>Sign Up</h1>
                        <p>Please fill in this form to create an account!</p>
                    </div>
                    <div className='signup-body'>
                        <div>
                            <Field name='firstName' placeholder='First Name' />
                            <ErrorMessage name='firstName'>
                                {name => (
                                    <div className='error-icon'>
                                        <FaExclamationCircle
                                            size='25px'
                                        />
                                        <div className='error-popup'>
                                            {name}
                                        </div>
                                    </div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div>
                            <Field name='lastName' placeholder='Last Name' />
                            <ErrorMessage name='lastName'>
                                {name => (
                                    <div className='error-icon'>
                                        <FaExclamationCircle
                                            size='25px'
                                        />
                                        <div className='error-popup'>
                                            {name}
                                        </div>
                                    </div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div>
                            <Field name='username' placeholder='User Name' />
                            <ErrorMessage name='username'>
                                {name => (
                                    <div className='error-icon'>
                                        <FaExclamationCircle
                                            size='25px'
                                        />
                                        <div className='error-popup'>
                                            {name}
                                        </div>
                                    </div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div>
                            <Field
                                name='phoneNumber'
                                type='tel'
                                placeholder='Phone Number'
                            />
                            <ErrorMessage name='phoneNumber'>
                                {name => (
                                    <div className='error-icon'>
                                        <FaExclamationCircle
                                            size='25px'
                                        />
                                        <div className='error-popup'>
                                            {name}
                                        </div>
                                    </div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div>
                            <Field
                                name='password'
                                type='password'
                                placeholder='Password'
                            />
                            <ErrorMessage name='password'>
                                {name => (
                                    <div className='error-icon'>
                                        <FaExclamationCircle
                                            size='25px'
                                        />
                                        <div className='error-popup'>
                                            {name}
                                        </div>
                                    </div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div>
                            <Field
                                name='confirmPassword'
                                type='password'
                                placeholder='Confirm Password'
                            />
                            <ErrorMessage name='confirmPassword'>
                                {name => (
                                    <div className='error-icon'>
                                        <FaExclamationCircle
                                            size='25px'
                                        />
                                        <div className='error-popup'>
                                            {name}
                                        </div>
                                    </div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div className='signup-email'>
                            <Field name='email' placeholder='Email' />
                            <ErrorMessage name='email'>
                                {name => (
                                    <div className='error-icon'>
                                        <FaExclamationCircle
                                            size='25px'
                                        />
                                        <div className='error-popup'>
                                            {name}
                                        </div>
                                    </div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div className='signup-email'>
                            <ErrorMessage
                                name='usernameError'
                                component='div'
                            />
                            <ErrorMessage name='phoneError' component='div' />
                            <ErrorMessage name='emailError' component='div' />
                        </div>
                        <div>
                            <button
                                type='submit'
                                disabled={isSubmitting}
                                style={{ display: 'flex' }}
                            >
                                <MdPersonAdd size='1.4em' />
                                &nbsp; Sign Up
                            </button>
                        </div>
                        <div />
                        Already have an account? &nbsp;&nbsp;
                        <Link to='/signin'>Sign In</Link> &nbsp;
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default Signup;
