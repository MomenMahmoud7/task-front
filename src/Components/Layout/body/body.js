import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../Contexts/GlobalContext';
import { SignupContext } from '../../../Contexts/SignupContext';
import Signup from '../../Registration/signup/signup';
import CodeVerification from '../../Registration/codeVerification/codeVerification';
import EmailVerification from '../../Registration/emailVerification/emailVerification';
import VerificationResult from '../../Registration/verificationResult/verificationResult';
import EmailVerificationError from '../../Registration/emailVerificationError/emailVerificationError';
import EmailVerified from '../../Registration/emailVerified/emailVerified';
import AuthenticatedRoute from '../../../Routes/AuthenticatedRoute';
import NormalRoute from '../../../Routes/NormalRoute';
import Login from '../../Login/login';
import Home from '../../Home/home/home';
import './body.scss';
import Error from '../../Error/error';

const Body = () => {
  const { token } = useContext(GlobalContext);
  const { signupStatus } = useContext(SignupContext);
  return (
    <div className='body-container'>
      <Switch>
        <Route
          exact
          path='/not-found'
          render={routeProps => <Error {...routeProps} />}
        />
        <NormalRoute
          exact
          path='/signup'
          render={routeProps => <Signup {...routeProps} />}
        />
        <NormalRoute
          exact
          path='/phone-verification'
          render={routeProps =>
            signupStatus === 'email-verification' ? (
              <Redirect to='/login' />
            ) : (
              <CodeVerification {...routeProps} />
            )
          }
        />
        <NormalRoute
          exact
          path='/email-verification'
          render={() =>
            signupStatus === 'verified' ? (
              <Redirect to='/login' />
            ) : (
              <EmailVerification />
            )
          }
        />
        <NormalRoute
          exact
          path='/verification-result'
          render={routeProps =>
            signupStatus === 'verified' ? (
              <Redirect to='/login' />
            ) : (
              <VerificationResult {...routeProps} />
            )
          }
        />
        <NormalRoute
          exact
          path='/email-verified'
          render={routeProps =>
            signupStatus === 'verified' ? (
              <Redirect to='/login' />
            ) : (
              <EmailVerified {...routeProps} />
            )
          }
        />
        <NormalRoute
          exact
          path='/email-verification-error'
          render={routeProps =>
            signupStatus === 'verified' ? (
              <Redirect to='/login' />
            ) : (
              <EmailVerificationError {...routeProps} />
            )
          }
        />
        <NormalRoute
          exact
          path='/login'
          render={routeProps =>
            token ? <Redirect to='/' /> : <Login {...routeProps} />
          }
        />
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
