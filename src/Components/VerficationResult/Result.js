import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
export default function Result(props) {
  const [tokenStatus, setTokenStatus] = useState("pending");

  useEffect(() => {
    const callAPI = async () => {
      console.log(tokenStatus);
      const query = props.location.search;
      const values = query ? queryString.parse(props.location.search) : "";
      const token = values ? values.emailToken : "";
      const res = await fetch(
        `https://api-lb.herokuapp.com/api/users/confirmEmail?emailToken=${token}`
      );
      const data = await res.json();
      if (data.error) {
        const code = data.error.code;
        setTokenStatus(code || "INCORRECT_TOKEN");
      } else {
        setTokenStatus("verified");
      }
    };
    callAPI();
  }, []);
  const renders = {
    pending: <h1>waiting</h1>,
    EXPIRED_TOKEN: <h1>Code is expired</h1>,
    INCORRECT_TOKEN: <h1>Code is incorrect</h1>,
    verified: <Redirect to="/login" />
  };
  return <>{renders[tokenStatus]}</>;
}
