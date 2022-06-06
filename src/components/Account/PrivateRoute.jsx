import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AppContext } from "../../AppContext";

function PrivateRoute({ children, ...rest }) {
  const { isAuth } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
