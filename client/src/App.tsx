import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ErrorPage } from "./pages/ErrorPage";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={About} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
