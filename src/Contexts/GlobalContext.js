import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext({});

const GlobalProvider = props => {
  const [pending, setPending] = useState(true);
  const [userStatus, setUserStatus] = useState("");
  const [requestId, setRequestId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const userStatus = localStorage.getItem("userStatus");
    setUserStatus(userStatus);
    const requestId = localStorage.getItem("requestId");
    setRequestId(requestId);
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleUserStatus = userStatus => {
    setUserStatus(userStatus);
    localStorage.setItem("userStatus", userStatus);
  };
  const handleRequestId = requestId => {
    setRequestId(requestId);
    localStorage.setItem("requestId", requestId);
  };

  return (
    <GlobalContext.Provider
      value={{
        pending,
        userStatus,
        handleUserStatus,
        requestId,
        handleRequestId
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
