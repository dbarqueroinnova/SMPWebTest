import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import querystring from "query-string";
import { LinearProgress } from "@mui/material";
export const Callback = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const urlParams = querystring.parse(window.location.search);

  if (isLoading) {
    if (urlParams.code) {
      sessionStorage.setItem("code", urlParams.code);
    }
    return <LinearProgress color="primary" />
  }

  if (isAuthenticated) {
      return (<Redirect to="/Home"/>)
  }
};
