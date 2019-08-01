import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { GlobalContext } from "../../../Contexts/GlobalContext";
import Signup from "../../Registration/signup/signup";
import Login from "../../Login/login";
import CodeVerification from "../../Registration/codeVerification/codeVerification";
import EmailVerification from "../../Registration/emailVerification/emailVerification";
import Result from "../../VerficationResult/Result";
import Home from "../../Home/home";
import AuthenticatedRoute from "../../../Wrappers/AuthenticatedRoute";
import NormalRouter from "../../../Wrappers/NormalRouter";
const Body = () => {
  const { userStatus, token } = useContext(GlobalContext);
  return (
    <div style={{ marginTop: "128px" }}>
      <Switch>
        <NormalRouter
          exact
          path="/phoneverification"
          render={() =>
            userStatus !== "phoneverification" ? (
              <Redirect to="/login" />
            ) : (
              <CodeVerification />
            )
          }
        />
        <NormalRouter
          exact
          path="/emailverification"
          render={() =>
            userStatus !== "emailverification" ? (
              <Redirect to="login" />
            ) : (
              <EmailVerification />
            )
          }
        />
        <NormalRouter exact path="/confirmMail" component={Result} />
        <NormalRouter
          exact
          path="/login"
          render={routeProps => <Login {...routeProps} />}
        />
        <NormalRouter
          exact
          path="/signup"
          render={() =>
            userStatus ? <Redirect to={`/${userStatus}`} /> : <Signup />
          }
        />
        )}
        <AuthenticatedRoute
          exact
          path="/"
          render={routeProps => <Home {...routeProps} />}
        />
        <Route />
      </Switch>
    </div>
  );
};
export default Body;
