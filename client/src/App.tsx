import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ErrorPage } from "./pages/ErrorPage";
import { Store } from "./store";
import { TContext } from "./customTypes";
import { PrivateRoute } from "./components/PrivateRoute";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";
import { logout } from "./actions/user";
import { auth } from "./actions/user";
import axios from "axios";
function App() {
  const { state, dispatch } = useContext(Store) as TContext;
  const handleLogout = () => {
    dispatch(logout());
  };
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get("/api/users/auth");
      console.log(data);
      dispatch(auth(data));
    } catch (error) {
      console.error(error.response);
    }
  };
  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <Navbar handleLogout={handleLogout} isAuth={state.isAuth} />
      <Switch>
        <Route path="/" component={About} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <PrivateRoute
          component={Dashboard}
          isAuth={state.isAuth}
          path="/dashboard"
          exact
        />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
