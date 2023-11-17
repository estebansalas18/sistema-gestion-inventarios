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
import { Dropdown } from "@/components/dropdown";

const Inventarios = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  if (user) {
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
              <Dropdown />
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
