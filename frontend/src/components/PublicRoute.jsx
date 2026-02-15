import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Skeleton } from "./ui/skeleton";

const PublicRoute = () => {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <Skeleton />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;