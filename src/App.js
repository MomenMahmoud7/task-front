import React from 'react';
import GlobalProvider from './Contexts/GlobalContext';
import Navbar from './Components/Layout/navbar/navbar';
import Loader from './Components/Layout/loader/loader';
import Footer from './Components/Layout/footer/footer';
import Body from './Components/Layout/body/body';
import SignupProvider from './Contexts/SignupContext';

const App = () => {
  return (
    <GlobalProvider>
      <Navbar />
      <Loader />
      <SignupProvider>
        <Body />
      </SignupProvider>
      <Footer />
    </GlobalProvider>
  );
};

export default App;
