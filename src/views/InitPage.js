import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const InitPage = ({ history }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="loginPage">
      <div className="loginButton">
        {loginWithRedirect()}
      </div>
    </div>
  );
};
