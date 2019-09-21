import React from "react";
import { Switch, Route } from "react-router-dom";

// TODO: change loadable
import HomePage from "containers/HomePage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";

import GlobalStyle from "../../global-styles";

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route component={NotFoundPage} />
    </Switch>
    <GlobalStyle />
  </div>
);

export default App;
