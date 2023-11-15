import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

function index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return window.location.replace("/inventarios");
  }
  return (
    <main
      className="h-screen w-full flex flex-col items-center justify-center"
      style={{ backgroundColor: "#181c24" }}
    >
      <h1 className="font-bold text-6xl text-white mb-20">
        Sistema de Gestión de Inventarios
      </h1>
      <Link href="/api/auth/login">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Iniciar Sesión
        </button>
      </Link>
    </main>
  );
}

export default index;
