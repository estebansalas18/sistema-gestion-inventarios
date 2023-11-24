import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSession } from "next-auth/react";
import { inventarios_header } from "../data/arrays";
import { Title } from "@/components/title";
import useSWR, { mutate } from "swr";
import { API_ROUTES, fetcher } from "@/service/apiConfig";
import { Dropdown } from "@/components/dropdown";
import InventoryChart from "@/components/diagram";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
import { Button } from "@/components/button";
import InventarioModal from "@/components/modales/inventarioModal";
import MaterialService from "@/service/materialservice";
import InventoryMovementService from "@/service/inventoryMovementService";
import { InventoryMovement } from "@prisma/client";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PrivateComponent } from "@/components/PrivateComponent";

interface InventoryContentProps {
  inventory: {
  id: string;
    movementType: string;
    quantity: number;
    materialId: string;
    userId: string;
    date: Date;
  }[];  
}

const InventoryContent = ({ inventory }: InventoryContentProps) => {
  const [materialQuantity, setMaterialQuantity] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: materials, error: materialsError, isLoading } = useSWR(
    API_ROUTES.materials, fetcher
  );

  if (isLoading) return <div> cargando... </div>;
  if (materialsError) return <div> No se pudieron cargar los materiales </div>;
  const fetchMaterialQuantity = async () => {
    if (selectedMaterial) {
      try {
        const quantity = await MaterialService.getMaterialQuantity(selectedMaterial);
        setMaterialQuantity(quantity);
      } catch (error) {
        console.error("Error al obtener la cantidad del material:", error);
      }
    }
  };

  // useEffect(() => {
  //   fetchMaterialQuantity();
  // }, [selectedMaterial, inventory]);

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

  const uniqueMaterialIds = [
    ...new Set(inventory.map((movement) => movement.materialId)),
  ];

  const revalidateMovements = async () => {
    // Actualiza los datos llamando a la función `mutate` de useSWR
    mutate(API_ROUTES.inventoryMovementsSupabase, InventoryMovementService.getAllInventoryMovements);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 mt-20 pl-80">
        <Title
          title="Gestión de Inventarios"
          subtitle={
            selectedMaterial
              ? `Material seleccionado: ${
                  materials.materials.find((material) => material.id === selectedMaterial)
                    ?.name || `Material ${selectedMaterial}`
                }`
              : "Selecciona un Material"
          }
        />
        <div className="px-28 py-5">
          <div className="flex justify-between">
            <Dropdown
              materialIds={uniqueMaterialIds}
              materials={materials.materials}
              onSelect={handleMaterialSelect}
              isOpen={dropdownOpen}
              handleDropdownToggle={handleDropdownToggle}
              toggleDropdown={setDropdownOpen}
            />
            <Button
                text="Agregar Movimiento"
                onClick={() => {
                  InventarioModal({
                    name:
                      materials.materials.find(
                        (material) => material.id === selectedMaterial
                      )?.name || `Material ${selectedMaterial}`,
                    revalidateMovements: () => mutate(API_ROUTES.inventoryMovementsSupabase),

                  });
                }}
                disabled={!selectedMaterial}
                title="Selecciona un material antes de agregar un movimiento."
              />
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
            title={`Cantidad del material seleccionado: ${materialQuantity}`}
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

const InventoryWrapper = () => {
   return(
    <PrivateRoute>
      <Inventarios />
    </PrivateRoute>
   );
}

const Inventarios = () => {
  const { data, status } = useSession();
  const {
    data: inventory,
    error: inventoryError,
    isLoading: inventoryIsLoading,
  } = useSWR(API_ROUTES.inventory, fetcher);

  const user = data?.user;

  if (status === 'loading') return <Loading />;
  //if (error) return <div>{error.message}</div>;
  if (inventoryIsLoading) return <div>Cargando inventario...</div>;
  if (inventoryError) return <div>No se pudieron cargar los materiales</div>;

  const inventarioArray: InventoryMovement[] = Object.values(inventory.inventoryMovements);
  if (user) return <InventoryContent inventory={inventarioArray} />;
  return <Error />;
};

export default InventoryWrapper;
