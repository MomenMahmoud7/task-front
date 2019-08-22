import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import Loader from 'react-loader-spinner';
import { GlobalContext } from '../../../Contexts/GlobalContext';
import './verificationResult.scss';
import axios from 'axios';

export default function VerificationResult(props) {
  const { handleSignupStatus } = useContext(GlobalContext);
  const [tokenStatus, setTokenStatus] = useState('waiting');

  useEffect(() => {
    const fetchData = async () => {
      const query = props.location.search;
      const values = query ? queryString.parse(props.location.search) : null;
      const token = values ? values.emailToken : null;
      try {
        await axios.get(
          `https://api-lb.herokuapp.com/api/users/verification-result?emailToken=${token}`
        );
        props.history.push('/email-verified');
        setTokenStatus('verified');
        handleSignupStatus('verified');
      } catch (error) {
        props.history.push('/email-verification-error');
        setTokenStatus('error');
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {tokenStatus === 'waiting' ? (
        <div className='loader-container'>
          <Loader type='Puff' color='#00BFFF' />
        </div>
      ) : null}
    </>
  );
}
