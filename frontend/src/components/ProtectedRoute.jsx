import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Skeleton } from "./ui/skeleton";

const ProtectedRoute = () => {
  const { isAuthenticated, isAuthLoading } = useAuth();

  console.log("came through here!");

  if (isAuthLoading) {
    return <Skeleton/>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
