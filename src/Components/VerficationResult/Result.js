import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

export default function Result(props) {
  const [tokenStatus, setTokenStatus] = useState('waiting');

  const callAPI = async () => {
    console.log(tokenStatus);
    const query = props.location.search;
    const values = query ? queryString.parse(props.location.search) : '';
    const token = values ? values.emailToken : '';
    const res = await fetch(
      `https://api-lb.herokuapp.com/api/users/confirmEmail?emailToken=${token}`
    );
    const data = await res.json();
    if (data.error) {
      const code = data.error.code;
      if (code === 'EXPIRED_TOKEN') setTokenStatus('Code is expired');
      else setTokenStatus('Code is incorrect');
    } else {
      setTokenStatus('verified');
      setTimeout(() => props.history.push('/signin'), 300);
    }
  };

  useEffect(() => {
    callAPI();
  }, []);
  return <h1>{tokenStatus}</h1>;
}
