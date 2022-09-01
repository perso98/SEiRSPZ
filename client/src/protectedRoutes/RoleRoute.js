import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function RoleRoute(props) {
  return props?.role ? <Outlet /> : <Navigate to="/noauth" />;
}

export default RoleRoute;
