import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext({});

const GlobalProvider = props => {
  const prevToken = localStorage.getItem("token") || "";
  const [userStatus, setUserStatus] = useState("");
  const [requestId, setRequestId] = useState("");
  const [token, setToken] = useState(prevToken);

  useEffect(() => {
    const userStatus = localStorage.getItem("userStatus");
    setUserStatus(userStatus);
    const requestId = localStorage.getItem("requestId");
    setRequestId(requestId);
    localStorage.setItem("token", prevToken);
  }, [token]);

  const handleUserStatus = userStatus => {
    setUserStatus(userStatus);
    localStorage.setItem("userStatus", userStatus);
  };
  const handleRequestId = requestId => {
    setRequestId(requestId);
    localStorage.setItem("requestId", requestId);
  };
  const handleToken = token => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  return (
    <GlobalContext.Provider
      value={{
        userStatus,
        handleUserStatus,
        requestId,
        handleRequestId,
        token,
        handleToken
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
