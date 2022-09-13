import { useAuth } from "@app/hooks/useAuth";
import { logout } from "@app/services/Users";
import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";

export const LogoutIlx: React.FunctionComponent = () => {

  const { setAuth } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    logout().then(() => {
      setAuth({});
      setLoading(false);
    });
  }, []);

  return <>{ loading ? <LoadingSpinner /> : <Redirect to={ '/products'} />} </>
};