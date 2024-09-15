import { ReactNode } from "react";
import { useAuth } from "../../hook/useAuth";
import Loading from "../Loading";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  path?: string;
}

export default function PrivateRoute({ children, path }: PrivateRouteProps) {
  const { user, loading }: { user: any; loading: boolean } = useAuth();

  if (loading) return <Loading isLoading={loading} />;

  if (!user) return <Navigate to={"/"}></Navigate>;

  if (path === "/admin" && user.role !== "admin")
    return <Navigate to={"/"}></Navigate>;

  if (path === "/dashboard" && user.role !== "member")
    return <Navigate to={"/"}></Navigate>;

  return <>{children}</>;
}
