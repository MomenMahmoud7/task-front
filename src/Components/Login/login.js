import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { TiInfoLarge } from 'react-icons/ti';
import * as Yup from 'yup';
import './login.scss';

const Login = () => {
    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required')
    });

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {}}
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
