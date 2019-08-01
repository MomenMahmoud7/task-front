import React from 'react';
import GlobalProvider from './Contexts/GlobalContext';
import Body from './Components/Layout/body/body';
import Navbar from './Components/Layout/navbar/navbar';

const App = () => {
  return (
    <GlobalProvider>
      <Body />
      <Navbar />
    </GlobalProvider>
  );
};

export default App;
