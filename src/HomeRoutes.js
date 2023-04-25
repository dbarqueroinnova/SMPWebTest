import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import BuildRoutes from "./BuildRoutes";
import { LinearProgress } from "@mui/material";
import { ToastErrorAccess } from "./components/Progress/ToastErrorDatabase";

function HomeRoutes(props) {

  const { user, isLoading, error } = useUser();
  const router = useRouter()

  if (isLoading) return <LinearProgress/>

  if (error) return <ToastErrorAccess/>
  
  return (
    user ? (
      <BuildRoutes>
        {props.children}
      </BuildRoutes>
    ) : router.push('/api/auth/login')
  )
};


export default HomeRoutes

