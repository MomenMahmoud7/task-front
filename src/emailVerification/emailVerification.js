import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GlobalContext } from '../Context/GlobalContext';
import './emailVerification.scss';

const EmailVerification = () => {
    const {  } = useContext(GlobalContext);
    return (
        <Formik
            initialValues={{
                verificationCode: ''
            }}
            validate={values => {
                let errors = {};

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className='verification-code-container'>
                    <div className='verification-code-header'>
                        <h2>Verification Code</h2>
                    </div>
                    <div className='verification-code-body'>
                        <div>
                            <Field
                                name='verificationCode'
                                placeholder='Enter your code'
                            />
                            <ErrorMessage
                                name='email'
                                component='div'
                                className='warning'
                            />
                        </div>
                        <div>
                            <button type='submit'>Verify</button>
                            <button type='submit' className='resend'>
                                Resend
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default EmailVerification;
