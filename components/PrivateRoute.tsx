import { useSession } from "next-auth/react";
import { Error } from "./error";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { status } = useSession();
  if (status === "loading") return <div>Cargando...</div>;
  if (status === "authenticated") return <div>{children}</div>;
  return <Error />;
};

export { PrivateRoute };
