import { Outlet, Navigate } from "react-router-dom";
import React from "react";

function LoggedRoute(props) {
  return props.auth?.logged ? <Outlet /> : <Navigate to="/login" replace />;
}

export default LoggedRoute;
