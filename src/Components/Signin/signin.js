import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { FaTimesCircle } from 'react-icons/fa';
import './signin.scss';

const Signin = () => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validate={values => {
                let errors = {};
                if (!values.password) errors.password = '* Required';
                else if (!values.confirmPassword)
                    errors.confirmPassword = '* Required';

                if (!values.email) {
                    errors.email = '* Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                    )
                ) {
                    errors.email = '* Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form className='signin-container'>
                    <div className='signin-header'>
                        <h1>Sign In</h1>
                    </div>
                    <div className='signin-body'>
                        <div>
                            <Field name='email' placeholder='Email' />
                            <ErrorMessage name='email'>
                                {(name) => (
                                    <div>
                                    <FaTimesCircle
                                        size='28px'
                                        color='red'
                                        className='error-icon'
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
                            <ErrorMessage name='email'>
                                {(name) => (
                                    <div>
                                    <FaTimesCircle
                                        size='28px'
                                        color='red'
                                        className='error-icon'
                                    />
                                    <div className='error-popup'>
                                    {name}
                                </div>
                                    </div>
                                )}
                            </ErrorMessage>
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
export default Signin;
