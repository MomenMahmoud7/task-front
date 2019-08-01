import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../Contexts/GlobalContext';
import Signup from '../../Registration/signup/signup';
import Login from '../../Login/login';
import CodeVerification from '../../Registration/codeVerification/codeVerification';
import EmailVerification from '../../Registration/emailVerification/emailVerification';
import Result from '../../Registration/verificationResult/verificationResult';
import Home from '../../Home/home';
import AuthenticatedRoute from '../../../Routes/AuthenticatedRoute';
import NormalRoute from '../../../Routes/NormalRoute';

const Body = () => {
  const { userStatus, token } = useContext(GlobalContext);
  return (
    <div style={{ marginTop: '128px' }}>
      <Switch>
        <NormalRoute
          exact
          path='/phoneverification'
          render={() =>
            userStatus !== 'phoneverification' ? (
              <Redirect to='/login' />
            ) : (
              <CodeVerification />
            )
          }
        />
        <NormalRoute
          exact
          path='/emailverification'
          render={() =>
            userStatus !== 'emailverification' ? (
              <Redirect to='login' />
            ) : (
              <EmailVerification />
            )
          }
        />
        <NormalRoute exact path='/confirmMail' component={Result} />
        <NormalRoute
          exact
          path='/login'
          render={routeProps => <Login {...routeProps} />}
        />
        <NormalRoute
          exact
          path='/signup'
          render={() =>
            userStatus ? <Redirect to={`/${userStatus}`} /> : <Signup />
          }
        />
        )}
        <AuthenticatedRoute
          exact
          path='/'
          render={routeProps => <Home {...routeProps} />}
        />
      </Switch>
    </div>
  );
};
export default Body;
