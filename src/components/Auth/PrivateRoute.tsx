import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoute;
