import { Navigate, useLocation, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({
  allowedRoles,
}: {
  allowedRoles?: string[];
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
