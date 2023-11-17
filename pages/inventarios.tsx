import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  inventarios_fields,
  inventarios_header,
} from "../data/arrays";
import { Error } from "../components/error";
import { Button } from "@/components/button";
import { MaterialModal } from "@/components/modales/materialModal";
import { Title } from "@/components/title";
import Table from "@/components/table";
import useSWR from "swr";
import { API_ROUTES, fetcher } from "@/service/apiConfig";

const InventoryContent = ({ inventory }) => {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownButtonRef = useRef();

  const { data: materials, error: materialsError } = useSWR(API_ROUTES.materials, fetcher);

  if (materialsError) {
    return <div>Error al cargar los materiales</div>;
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []); // Empty dependency array, runs once after initial render

  const handleDropdownToggle = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  const handleMaterialSelect = (materialId) => {
    setSelectedMaterial(materialId);
    setDropdownOpen(false);
  };

  const calculateTotalQuantity = () => {
    if (!selectedMaterial) return 0;

    const entrada = inventory
      .filter((movement) => movement.materialId === selectedMaterial)
      .filter((movement) => movement.movementType === 'ENTRADA')
      .reduce((total, movement) => total + movement.quantity, 0);

    const salida = inventory
      .filter((movement) => movement.materialId === selectedMaterial)
      .filter((movement) => movement.movementType === 'SALIDA')
      .reduce((total, movement) => total + movement.quantity, 0);

    return entrada - salida;
  };

  const uniqueMaterialIds = [...new Set(inventory.map((movement) => movement.materialId))];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 mt-20 pl-80">
        <Title title="Gestión de Inventarios" />
        <h2 className="text-xl font-bold text-center mb-4">
          {selectedMaterial
            ? `Material seleccionado: ${materials.find((material) => material.id === selectedMaterial)?.name ||
            `Material ${selectedMaterial}`
            }`
            : "Selecciona un Material"}
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
                  className={`w-2.5 h-2.5 ms-3 ${dropdownOpen ? "transform rotate-180" : ""
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
                className={`${dropdownOpen ? "block" : "hidden"
                  } absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {uniqueMaterialIds.map((materialId) => {
                    // Encuentra el material correspondiente usando el id
                    const materialInfo = materials?.find((material) => material.id === materialId);

                    return (
                      <li key={materialId}>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => handleMaterialSelect(materialId)}
                        >
                          {materialInfo ? materialInfo.name : `Material ${materialId}`}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <Button text="Agregar Movimiento" onClick={MaterialModal} />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {inventarios_header.map((header) => (
                    <th key={header} scope="col" className="px-6 py-3">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedMaterial
                  ? inventory
                    .filter((movement) => movement.materialId === selectedMaterial)
                    .map((movement) => (
                      <tr
                        key={movement.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4">{movement.id}</td>
                        <td className="px-6 py-4">{movement.date}</td>
                        <td className="px-6 py-4">
                          {movement.movementType === 'ENTRADA' ? movement.quantity : ''}
                        </td>
                        <td className="px-6 py-4">
                          {movement.movementType === 'SALIDA' ? movement.quantity : ''}
                        </td>
                        <td className="px-6 py-4">{movement.userId}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
          <Title title={`Cantidad del material seleccionado: ${calculateTotalQuantity()}`} />
          <h2 className="text-base font-semibold text-left mb-4">
            Saldo actual
          </h2>
        </div>
      </div>
    </div>
  );
};

const Inventarios = () => {
  const { user, error, isLoading } = useUser();
  const {
    data: inventory,
    error: inventoryError,
    isLoading: inventoryIsLoading,
  } = useSWR(API_ROUTES.inventoryMovements, fetcher);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>{error.message}</div>;
  if (inventoryIsLoading) return <div>Cargando inventario...</div>;
  if (inventoryError) return <div>No se pudieron cargar los materiales</div>;

  return <InventoryContent inventory={inventory} />;

};

export default Inventarios;
