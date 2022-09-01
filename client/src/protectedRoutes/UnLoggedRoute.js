import { Outlet, Navigate } from "react-router-dom";
import React from "react";

function UnLoggedRoute(props) {
  return props.auth?.logged ? <Navigate to="/home" /> : <Outlet />;
}

export default UnLoggedRoute;
