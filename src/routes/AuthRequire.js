import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

function AuthRequire({ children }) {
  const { isAuthenticated, isInitialized, user } = useAuth();
  console.log(user);
  const location = useLocation();
  if (!isInitialized) {
    return <LoadingScreen />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // if (isAuthenticated && user.role === "admin") {
  //   return <Navigate to="/admin" />;
  // }

  return children;
}

export default AuthRequire;
