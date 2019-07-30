import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import Signup from "../signup/signup";
import Signin from "../signin/signin";
import CodeVerification from "../codeVerification/codeVerification";
import EmailVerification from "../emailVerification/emailVerification";
import Result from "../VerficationResult/Result";
const Body = () => {
  const { userStatus } = useContext(GlobalContext);

  return (
    <div style={{ marginTop: "128px" }}>
      <Switch>
        <Route
          exact
          path="/phoneverification"
          render={() => <CodeVerification />}
        />
        <Route
          exact
          path="/emailverification"
          render={() => <EmailVerification />}
        />
        <Route exact path="/signin" render={() => <Signin />} />
        <Route exact path="/confirmMail" component={Result} />
        <Route
          exact
          path="/signup"
          render={() =>
            userStatus ? <Redirect to={`/${userStatus}`} /> : <Signup />
          }
        />
        )}
      </Switch>
    </div>
  );
};
export default Body;
