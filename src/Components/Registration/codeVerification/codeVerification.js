import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SignupContext } from '../../../Contexts/SignupContext';
import {
  TiWarning,
  TiArrowBack,
  TiLocationArrow,
  TiDelete
} from 'react-icons/ti';
import * as Yup from 'yup';
import './codeVerification.scss';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
import { GlobalContext } from '../../../Contexts/GlobalContext';

const CodeVerification = props => {
  const { handleSignupStatus, requestId } = useContext(SignupContext);
  const { userId } = useContext(GlobalContext);
  const [verifyPending, setVerifyPending] = useState(false);
  const [resendPending, setResendPending] = useState(false);
  const verificationCodeSchema = Yup.object().shape({
    verificationCode: Yup.string()
      .length(4, 'Invalid verification code')
      .required('Required')
  });

  const resend = async () => {
    setResendPending(true);
    try {
      await axios.post(
        `https://api-lb.herokuapp.com/api/users/resendCode/${userId}`,
        {}
      );
      setResendPending(false);
    } catch (error) {
      setResendPending(false);
      if (error) props.history.push('/not-found');
    }
  };
  return (
    <Formik
      initialValues={{
        verificationCode: '',
        verificationCodeAfter: ''
      }}
      validationSchema={verificationCodeSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setSubmitting(false);
        setVerifyPending(true);
        try {
          const data = await axios.post(
            'https://api-lb.herokuapp.com/api/users/confirmPhone',
            {
              requestID: requestId,
              code: values.verificationCode
            }
          );
          setVerifyPending(false);
          localStorage.removeItem('requestId');
          handleSignupStatus('email-verification');
          props.history.push('/email-verification');
        } catch (error) {
          const { code } = error.response.data.error;
          setErrors({
            verificationCodeAfter:
              code === 'CODE_EXPIRED'
                ? 'Expired'
                : code === 'INCORRECT_CODE'
                ? 'Invalid verification code'
                : 'Max check attempts reached'
          });
          setVerifyPending(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className='verification-code-container'>
          <div className='verification-code-header'>
            <h2>Phone Verification</h2>
          </div>
          <div className='verification-code-body'>
            <div className='input-container'>
              <Field name='verificationCode' placeholder='Enter your code' />
              <ErrorMessage name='verificationCode'>
                {name => (
                  <div className='error-icon'>
                    <TiWarning size='24px' color='yellow' />
                    <div className='error-popup warning'>{name}</div>
                  </div>
                )}
              </ErrorMessage>
              <ErrorMessage name='verificationCodeAfter'>
                {name => (
                  <div className='error-icon'>
                    <TiDelete size='24px' color='red' />
                    <div className='error-popup'>{name}</div>
                  </div>
                )}
              </ErrorMessage>
            </div>
            <div className='input-container button-container'>
              <button type='submit' disabled={isSubmitting}>
                <div className='button-action'>Verifiy</div>
                <div className='button-label'>
                  {verifyPending ? (
                    <ClipLoader sizeUnit={'px'} size={24} color={'#1DA1F2'} />
                  ) : (
                    <TiLocationArrow size='1.4em' />
                  )}
                </div>
              </button>
              <button className='resend' onClick={resend}>
                <div className='button-label'>
                  {resendPending ? (
                    <ClipLoader sizeUnit={'px'} size={24} color={'#1DA1F2'} />
                  ) : (
                    <TiArrowBack size='1.4em' />
                  )}
                </div>
                <div className='button-action'>Resend</div>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default CodeVerification;
