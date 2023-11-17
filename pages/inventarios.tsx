import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  inventarios,
  inventarios_fields,
  inventarios_header,
} from "../data/arrays";
import { Error } from "../components/error";
import { Loading } from "@/components/loading";
import { Button } from "@/components/button";
import { MaterialModal } from "@/components/modales/materialModal";
import { Title } from "@/components/title";
import Table from "@/components/table";
import { FaTiktok } from "react-icons/fa";

const Inventarios = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Loading />;
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
          <Title title="Gestión de Inventarios" />
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
                    {inventarios.map((material) => (
                      <li key={material.id}>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {material.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button text="Agregar Movimiento" onClick={MaterialModal} />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <Table
                headers={inventarios_header}
                rows={inventarios}
                fieldsToShow={inventarios_fields}
              />
            </div>
            <Title title="Cantidad del material seleccionado: 100" />
            <h2 className="text-base font-semibold text-left mb-4">
              Saldo actual
            </h2>
          </div>
        </div>
      </div>
    );
  }
  return <Error />;
};

export default Inventarios;
