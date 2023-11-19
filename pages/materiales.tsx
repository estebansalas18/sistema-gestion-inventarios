import Sidebar from "../components/sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Error } from "../components/error";
import useSWR, { mutate } from "swr";
import { API_ROUTES, fetcher } from "@/service/apiConfig";
import { materiales_fields, materiales_header } from "@/data/arrays";
import Table from "@/components/table";
import MaterialModal from "@/components/modales/materialModal"; // Fix import statement
import { Loading } from "@/components/loading";
import { Button } from "@/components/button";
import { Title } from "@/components/title";

const Materiales = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;
  const revalidateMaterials = async () => {
    // Actualiza los datos llamando a la función `mutate` de useSWR
    mutate(API_ROUTES.materials);
  };
  
  if (user) {
    const {
      data: materials,
      error: materialsError,
      isLoading: materialssLoading,
    } = useSWR(API_ROUTES.materials, fetcher);
    if (materialssLoading) return <div>Cargando...</div>;
    if (materialsError) return <div>No se pudieron cargar los materiales</div>;
    
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 mt-20 pl-80 relative">
          <Title title="Gestión de Materiales" />
          <div className="px-28 py-5 ">
            <div className="text-right">
              <Button text="Agregar Material" onClick={() => MaterialModal(revalidateMaterials)} />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <Table
                headers={materiales_header}
                rows={materials}
                fieldsToShow={materiales_fields}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Error />;
};

export default Materiales;
