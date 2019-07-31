import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { GlobalContext } from "../../../Contexts/GlobalContext";
import Signup from "../../Signup/signup/signup";
import Signin from "../../Signin/signin";
import CodeVerification from "../../Signup/codeVerification/codeVerification";
import EmailVerification from "../../Signup/emailVerification/emailVerification";
import Result from "../../VerficationResult/Result";
const Body = () => {
  const { userStatus } = useContext(GlobalContext);
  return (
    <div style={{ marginTop: "128px" }}>
      <Switch>
        <Route
          exact
          path="/phoneverification"
          render={() =>
            userStatus ? (
              <Redirect to={`/${userStatus}`} />
            ) : (
              <CodeVerification />
            )
          }
        />
        <Route
          exact
          path="/emailverification"
          render={() => <EmailVerification />}
        />
        <Route exact path="/confirmMail" component={Result} />
        <Route exact path="/signin" render={() => <Signin />} />
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
