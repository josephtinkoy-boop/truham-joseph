import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();

  const rawUser = localStorage.getItem("user");

  let user = null;

  try {
    user = rawUser ? JSON.parse(rawUser) : null;
  } catch (e) {
    user = null;
  }

  // 🔥 STRICT VALIDATION (THIS IS THE KEY FIX)
  const isLoggedIn =
    user &&
    typeof user === "object" &&
    Object.keys(user).length > 0;

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default RequireAuth;