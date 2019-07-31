import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../Contexts/GlobalContext';
import Signup from '../../signup/signup/signup';
import Signin from '../../signin/signin';
import CodeVerification from '../../signup/codeVerification/codeVerification';
import EmailVerification from '../../signup/emailVerification/emailVerification';

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
                            <Redirect to={'/signup'} />
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
                            <Redirect to='/signup' />
                        ) : (
                            <EmailVerification />
                        )
                    }
                />
                <Route exact path='/signin' render={() => <Signin />} />
                <Route
                    exact
                    path='/signup'
                    render={() =>
                        userStatus ? (
                            <Redirect to={`/${userStatus}`} />
                        ) : (
                            <Signup />
                        )
                    }
                />
                )}
            </Switch>
        </div>
    );
};
export default Body;
