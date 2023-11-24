import React from "react";
import { Sidebar } from "../components/sidebar";
import { useSession } from "next-auth/react";
import { Error } from "../components/error";
import useSWR from "swr";
import { API_ROUTES, fetcher } from "@/service/apiConfig";
import { usuarios_fields, usuarios_header } from "@/data/arrays";
import { Table } from "@/components/table";
import { Title } from "@/components/title";
import { UsuarioModal } from "@/components/modales/usuarioModal";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const Usuarios = () => {
  const { data, status } = useSession();  

  //const { users, usersError, usersLoading } = useGetUsers();
  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
  } = useSWR(API_ROUTES.users, fetcher);
 

  if (status === 'loading' || usersLoading) return <div>Cargando...</div>;
  //if (userError) return <div>{userError?.message}</div>;
  if (usersError) return <div>{usersError?.message}</div>;

  if (status === 'authenticated') {
    const users = usersData.users;
    return (
      <ProtectedRoute roleName="ADMIN">        
        <div className="flex">
          <Sidebar />
          <div className="flex-1 mt-20 pl-80">
            <Title title="Gestión de Usuarios" />
            <div className="px-28 py-5 ">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <Table
                  headers={usuarios_header}
                  rows={users}
                  fieldsToShow={usuarios_fields}
                  actions={true}
                  onClick={(row) => UsuarioModal({ name: row.name, email:row.email })}
                  />
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }
  return <Error />;
};

export default Usuarios;