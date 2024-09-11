import { ReactNode } from "react";
import { useAuth } from "../../hook/useAuth";
import Loading from "../Loading";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading }: { user: any; loading: boolean } = useAuth();

  return (
    <>
      {loading ? (
        <Loading isLoading={Loading} />
      ) : user ? (
        children
      ) : (
        <Navigate to={"/"}></Navigate>
      )}
    </>
  );
}
