import { Sidebar } from "../components/sidebar";
import useSWR, { mutate } from "swr";
import { API_ROUTES, fetcher } from "@/service/apiConfig";
import { materiales_fields, materiales_header } from "@/data/arrays";
import { Table } from "@/components/table";
import MaterialModal from "@/components/modales/materialModal"; // Fix import statement
import { Loading } from "@/components/loading";
import { Button } from "@/components/button";
import { Title } from "@/components/title";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PrivateComponent } from "@/components/PrivateComponent";
import { useSession } from "next-auth/react";

const MaterialsWrapper = () => {
  return (
    <PrivateRoute>
      <Materiales />
    </PrivateRoute>
  );
};

const Materiales = () => {
  const {
    data: materials,
    error: materialsError,
    isLoading: materialssLoading,
  } = useSWR(API_ROUTES.materials, fetcher);
  const { data, status } = useSession();
  if (status !== "authenticated") return <div>Cargando...</div>;
  const user = data.user;
  const { data: userData, isLoading: userLoading } = useSWR(
    API_ROUTES.users + "/" + user.email,
    fetcher
  );
  if (userLoading) return <Loading />;
  const userId = userData.user.id;

  const revalidateMaterials = async () => {
    // Actualiza los datos llamando a la función `mutate` de useSWR
    mutate(API_ROUTES.materials);
  };

  if (materialssLoading) return <Loading />;
  if (materialsError) return <div>No se pudieron cargar los materiales</div>;
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 mt-20 pl-80 relative">
        <Title title="Gestión de Materiales" />
        <div className="px-28 py-5 ">
          <PrivateComponent roleName="ADMIN">
            <div className="text-right">
              <Button
                text="Agregar Material"
                onClick={() => MaterialModal(revalidateMaterials, userId)}
              />
            </div>
          </PrivateComponent>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table
              headers={materiales_header}
              rows={materials.materials}
              fieldsToShow={materiales_fields}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialsWrapper;
