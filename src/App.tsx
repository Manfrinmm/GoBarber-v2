import React from "react";

import AppProvider from "./hooks";
import SignIn from "./pages/SignIn";
import GlobalStyle from "./styles/global";

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppProvider>
      <SignIn />
    </AppProvider>
  </>
);

export default App;
