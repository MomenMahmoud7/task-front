import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../Contexts/GlobalContext';
import Signup from '../../Registration/signup/signup';
import Login from '../../Login/login';
import CodeVerification from '../../Registration/codeVerification/codeVerification';
import EmailVerification from '../../Registration/emailVerification/emailVerification';
import Result from '../../VerficationResult/Result';

const Body = () => {
  const { userStatus } = useContext(GlobalContext);
  return (
    <div style={{ marginTop: '128px' }}>
      <Switch>
        <Route
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
        <Route
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
        <Route exact path='/confirmMail' component={Result} />
        <Route exact path='/login' render={() => <Login />} />
        <Route
          exact
          path='/signup'
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
