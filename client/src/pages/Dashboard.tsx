import React, { useContext } from "react";
import { Store } from "../store";
import { TContext } from "../customTypes";
export const Dashboard = () => {
  const { state } = useContext(Store) as TContext;
  const { user } = state;

  return (
    <div className="container">
      <div className="jumbtron bg=success">
        <h1 className="display-4 text-capitalize">
          welcome {user?.name ? user.name : user?.email}
        </h1>
      </div>
    </div>
  );
};
