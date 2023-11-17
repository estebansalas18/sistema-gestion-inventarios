import React from "react";
import Sidebar from "../components/sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import useSWR from "swr";
import { API_ROUTES, fetcher } from "@/service/apiConfig";
import { useGetUsers } from '@/hooks/useGetUsers';
import { Console } from "console";
import { usuarios } from "@/data/arrays";

const Usuarios = () => {
  const { user, error: userError, isLoading: userIsLoading } = useUser();
  //const { users, usersError, usersLoading } = useGetUsers();
  const { data: users, error: usersError, isLoading: usersLoading } = useSWR(API_ROUTES.users, fetcher);

  if (userIsLoading || usersLoading) return <div>Cargando...</div>;
  if (userError) return <div>{userError?.message}</div>;
  if (usersError) return <div>{usersError?.message}</div>;
  console.log(users, usersError, usersLoading );
  if (user) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 mt-20 pl-80">
          <h1 className="text-3xl font-bold text-center mb-4">
            Gestión de Usuarios
          </h1>
          {/* Tabla de Usuarios */}
           
          <div className="px-28 py-5 ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Identificador
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Fecha de creación
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Correo
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Rol
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((usuarios) => (
                    <tr
                      key={usuarios.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {usuarios.id}
                      </td>
                      <td className="px-6 py-4">{usuarios.email}</td>
                      <td className="px-6 py-4">{usuarios.email}</td>
                      <td className="px-6 py-4">{usuarios.roleId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
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
          <span className="font-medium">Error!</span> Debes iniciar sesión para
          acceder a esta página.
        </div>
      </div>
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
};

export default Usuarios;
