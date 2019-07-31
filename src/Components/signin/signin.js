import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { TiInfoLarge } from 'react-icons/ti';
import * as Yup from 'yup';
import './signin.scss';

const Signin = () => {
    const signinSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Wrong Password')
            .matches(/(?=.*[A-Z])/, 'Wrong Password')
            .matches(/(?=.*[a-z])/, 'Wrong Password')
            .matches(/(?=.*[0-9])/, 'Wrong Password')
            .matches(
                /(?=.[!@#\$%\^&])/,
                'Must contain at least one special character(?=.[!@#$%^&)'
            )
            .required('Required')
    });

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={signinSchema}
            onSubmit={(values, { setSubmitting }) => {}}
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
                                {name => (
                                    <div className='error-icon'>
                                        <TiInfoLarge
                                            size='28px'
                                            color='white'
                                            className='icon'
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
                                        <TiInfoLarge size='28px' />
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
