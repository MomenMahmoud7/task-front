import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { GlobalContext } from "../Contexts/GlobalContext";
export default ({ render, ...routeProps }) => {
  const { token } = useContext(GlobalContext);
  return (
    <Route
      {...routeProps}
      render={routeProps =>
        token ? render(routeProps) : <Redirect to="/login" />
      }
    />
  );
};
