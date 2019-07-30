import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GlobalContext } from '../../../Contexts/GlobalContext';
import './codeVerification.scss';
import * as Yup from 'yup';

const CodeVerification = () => {
    const { handleUserStatus, requestId } = useContext(GlobalContext);
    const verificationCodeSchema = Yup.object().shape({
        verificationCode: Yup.string()
            .length(4, 'Invalid verification code')
            .required('Required')
    });

    return (
        <Formik
            initialValues={{
                verificationCode: ''
            }}
            validationSchema={verificationCodeSchema}
            onSubmit={(values, { setSubmitting, setError, setErrors }) => {
                setSubmitting(false);
                fetch('https://api-lb.herokuapp.com/api/users/confirmPhone', {
                    method: 'POST',
                    body: JSON.stringify({
                        requestID: requestId,
                        code: values.verificationCode
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (!data.error) {
                            handleUserStatus('emailverification');
                        } else {
                            setErrors({
                                verificationCode:
                                    data.error.code === 'CODE_EXPIRED'
                                        ? 'Expired'
                                        : data.error.code === 'INCORRECT_CODE'
                                        ? 'Invalid verification code'
                                        : 'Max check attempts reached'
                            });
                        }
                    });
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
                                name='verificationCode'
                                component='div'
                                // className='warning'
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
export default CodeVerification;
