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
        <main
        className="h-screen w-full flex flex-col items-center justify-center"
        style={{ backgroundColor: "#181c24" }}
      >
        <div
          className="flex items-center p-4 mb-4 text-4xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">¡Buen Intento!</span> Para acceder a esta página debe iniciar sesión
          </div>          
        </div>
        <Link href="/" className="text-red-400 text-2xl">Ir al inicio</Link>
      </main>
    );
}

export { PrivateRoute };