import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { materiales, inventarios } from "../data/arrays";
import Link from "next/link";

const Inventarios = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownButtonRef = useRef();

    const handleDropdownToggle = () => {
      setDropdownOpen(!dropdownOpen);
    };

    const handleOutsideClick = (event) => {
      if (
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleOutsideClick);

      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }, []);
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 mt-20 pl-80">
          <h1 className="text-3xl font-bold text-center mb-4">
            Gestión de Inventarios
          </h1>
          <h2 className="text-xl font-bold text-center mb-4">
            AQUI PONER EL NOMBRE DEL MATERIAL
          </h2>
          {/* Tabla de Productos */}
          <div className="px-28 py-5 ">
            <div className="flex justify-between pb-5">
              <div className="relative">
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  onClick={handleDropdownToggle}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  ref={dropdownButtonRef}
                >
                  Seleccionar Material{" "}
                  {/* LOS ICONOS SVG SE PUEDEN CAMBIAR POR REACT-ICONS */}
                  <svg
                    className={`w-2.5 h-2.5 ms-3 ${
                      dropdownOpen ? "transform rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdown"
                  className={`${
                    dropdownOpen ? "block" : "hidden"
                  } absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {materiales.map((material) => (
                      <li key={material.id}>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {material.nombre}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Agregar Movimiento
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
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Entrada
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Salida
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Responsable
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inventarios.map((inventario) => (
                    <tr
                      key={inventario.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {inventario.name}
                      </td>
                      <td className="px-6 py-4">{inventario.date}</td>
                      <td className="px-6 py-4">{inventario.entrance}</td>
                      <td className="px-6 py-4">{inventario.exit}</td>
                      <td className="px-6 py-4">{inventario.responsible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h1 className="text-3xl font-bold text-left mt-10">
              Cantidad del material seleccionado: 100
            </h1>
            <h2 className="text-base font-semibold text-left mb-4">
              Saldo actual
            </h2>
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

export default Inventarios;
