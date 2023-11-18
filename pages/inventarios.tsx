// Inventarios.tsx
import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { inventarios_header } from "../data/arrays";
import { Title } from "@/components/title";
import useSWR from "swr";
import { API_ROUTES, fetcher } from "@/service/apiConfig";
import Dropdown from "@/components/dropdown";
import InventoryChart from "@/components/diagram";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
import { Button } from "@/components/button";
import { InventarioModal } from "@/components/modales/inventarioModal";

interface InventoryContentProps {
  inventory: {
    id: number;
    date: string;
    movementType: string;
    quantity: number;
    materialId: number;
    userId: number;
  }[];
}

const InventoryContent = ({ inventory }: InventoryContentProps) => {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: materials, error: materialsError } = useSWR(
    API_ROUTES.materials,
    fetcher
  );

  if (materialsError) {
    return <div>Error al cargar los materiales</div>;
  }

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
      .filter((movement) => movement.movementType === "ENTRADA")
      .reduce((total, movement) => total + movement.quantity, 0);

    const salida = inventory
      .filter((movement) => movement.materialId === selectedMaterial)
      .filter((movement) => movement.movementType === "SALIDA")
      .reduce((total, movement) => total + movement.quantity, 0);

    return entrada - salida;
  };

  const uniqueMaterialIds = [
    ...new Set(inventory.map((movement) => movement.materialId)),
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 mt-20 pl-80">
        <Title
          title="Gestión de Inventarios"
          subtitle={
            selectedMaterial
              ? `Material seleccionado: ${
                  materials.find((material) => material.id === selectedMaterial)
                    ?.name || `Material ${selectedMaterial}`
                }`
              : "Selecciona un Material"
          }
        />
        <div className="px-28 py-5">
          <div className="flex justify-between">
            <Dropdown
              materialIds={uniqueMaterialIds}
              materials={materials}
              onSelect={handleMaterialSelect}
              isOpen={dropdownOpen}
              handleDropdownToggle={handleDropdownToggle}
              toggleDropdown={setDropdownOpen}
            />
            <Button text="Agregar Movimiento" onClick={InventarioModal} />
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
                      .filter(
                        (movement) => movement.materialId === selectedMaterial
                      )
                      .map((movement) => (
                        <tr
                          key={movement.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4">{movement.id}</td>
                          <td className="px-6 py-4">{movement.date}</td>
                          <td className="px-6 py-4">
                            {movement.movementType === "ENTRADA"
                              ? movement.quantity
                              : ""}
                          </td>
                          <td className="px-6 py-4">
                            {movement.movementType === "SALIDA"
                              ? movement.quantity
                              : ""}
                          </td>
                          <td className="px-6 py-4">{movement.userId}</td>
                        </tr>
                      ))
                  : null}
              </tbody>
            </table>
          </div>
          <div className="justify-end mt-10">
            <Title
              title={`Cantidad del material seleccionado: ${calculateTotalQuantity()}`}
              subtitle="Saldo total"
            />
            <InventoryChart
              selectedMaterial={selectedMaterial}
              inventory={inventory}
            />
          </div>
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

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;
  if (inventoryIsLoading) return <div>Cargando inventario...</div>;
  if (inventoryError) return <div>No se pudieron cargar los materiales</div>;

  if (user) return <InventoryContent inventory={inventory} />;
  return <Error />;
};

export default Inventarios;
