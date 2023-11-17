import React from "react";
import Sidebar from "../components/sidebar";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import useSWR from "swr";
import { API_ROUTES, fetcher } from "@/service/apiConfig";
import Swal from "sweetalert2";

const Materiales = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>{error.message}</div>;
  const [materiales, setMateriales] = useState<Array<any>>([]);
  const handleAddMaterial = async (nombre: string, saldo: number) => {
    const nuevoMaterial = {
      id: materiales.length + 1,
      fechaCreacion: new Date().toISOString(),
      nombre,
      saldo,
      creador: "Usuario Actual",
    };
    setMateriales([...materiales, nuevoMaterial]);
  };

  const modalX = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Agregar Material",
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre del producto" />
        <input id="saldo" class="swal2-input" placeholder="Saldo del producto" />
      `,
      confirmButtonText: "Agregar",
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("nombre").value,
          document.getElementById("saldo").value,
        ];
      },
    });

    if (formValues && formValues.length === 2) {
      handleAddMaterial(formValues[0], formValues[1]);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Agregado correctamente",
      });
    }
  };

  if (user) {
    const { data: materials, error: materialsError, isLoading: materialssLoading } = useSWR(API_ROUTES.materials, fetcher);
    if (materialssLoading) return <div>Cargando...</div>;
    if (materialsError) return <div>No se pudieron cargar los materiales</div>;
    console.log(materials, materialsError, materialssLoading );
  
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 mt-20 pl-80 relative">
          <h1 className="text-3xl font-bold text-center mb-4">
            Gestión de Materiales
          </h1>
          {/* Tabla de Materiales */}
          <div className="px-28 py-5 ">
            <div className="text-right">
              <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={modalX}
              >
                Añadir Material
              </button>
            </div>
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
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Saldo
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Creado por
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((material) => (
                    <tr
                      key={material.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {material.id}
                      </td>
                      <td className="px-6 py-4">{material.createdAt}</td>
                      <td className="px-6 py-4">{material.name}</td>
                      <td className="px-6 py-4">{material.quantity}</td>
                      <td className="px-6 py-4">{material.userId}</td>
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

export default Materiales;
