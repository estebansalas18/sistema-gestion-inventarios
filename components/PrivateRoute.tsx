import { useSession } from "next-auth/react";
import Link from "next/link";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
    const { status } = useSession();
    if (status === 'loading') return <div>Cargando...</div>;
    if (status === "authenticated") return <div>{children}</div>;

    return(
        <main>
            <h3>Para acceder a esta página debe iniciar sesión</h3>
            <Link href="/">Ir al inicio</Link>
        </main>
    );
}

export { PrivateRoute };