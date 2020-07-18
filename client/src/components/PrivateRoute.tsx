import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  isAuth,
  ...otherProps
}: any) => {
  return (
    <Route
      {...otherProps}
      render={(props) =>
        !isAuth ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};
