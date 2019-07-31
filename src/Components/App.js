import React, { useContext } from "react";
import GlobalProvider from "../Contexts/GlobalContext";
import Body from "./Layout/body/body";
import Navbar from "./Layout/navbar/navbar";

const App = () => {
  return (
    <GlobalProvider>
      <Body />
      <Navbar />
    </GlobalProvider>
  );
};

export default App;
