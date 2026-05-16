import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {

    const user = localStorage.getItem("user");

    console.log("RequireAuth check:", user);

    if (user) {
      setAllowed(true);
    }

    setLoading(false);

  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!allowed) {
    alert("You need to signin fast");
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default RequireAuth;