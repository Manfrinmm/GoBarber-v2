import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Route from "./Route";

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/" component={() => <h2>Página não encontrada</h2>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
