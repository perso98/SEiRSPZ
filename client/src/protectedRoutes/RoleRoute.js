import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function RoleRoute(props) {
  console.log(props);
  if (props?.role === undefined) return null;
  return props?.role ? (
    <Outlet />
  ) : props?.logged ? (
    <Navigate to="/noauth" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RoleRoute;
