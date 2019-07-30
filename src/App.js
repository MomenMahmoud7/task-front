import React, { useContext } from 'react';
import Body from './body/body';
import GlobalProvider from './Context/GlobalContext';
import { GlobalContext } from './Context/GlobalContext';
import Loader from 'react-loader-spinner';

import Navbar from './navbar/navbar';

const App = () => {
    const { pending } = useContext(GlobalContext);

    return (
        <GlobalProvider>
            <Navbar />
            {pending ? (
                <Loader type='Puff' color='#00BFFF' height='100' width='100' />
            ) : (
                <Body />
            )}
        </GlobalProvider>
    );
};

export default App;
