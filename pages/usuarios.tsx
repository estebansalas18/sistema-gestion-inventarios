import React from "react";
import Sidebar from "../components/sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Error } from "../components/error";
import useSWR from "swr";
import { API_ROUTES, fetcher } from "@/service/apiConfig";
import { useGetUsers } from "@/hooks/useGetUsers";
import { Console } from "console";
import { usuarios_fields, usuarios_header } from "@/data/arrays";
import Table from "@/components/table";
import { Title } from "@/components/title";
import { UsuarioModal } from "@/components/modales/usuarioModal";

const Usuarios = () => {
  const { user, error: userError, isLoading: userIsLoading } = useUser();
  //const { users, usersError, usersLoading } = useGetUsers();
  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
  } = useSWR(API_ROUTES.users, fetcher);

  if (userIsLoading || usersLoading) return <div>Cargando...</div>;
  if (userError) return <div>{userError?.message}</div>;
  if (usersError) return <div>{usersError?.message}</div>;
  console.log(users, usersError, usersLoading);
  if (user) {
    return (
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
                onClick={UsuarioModal}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Error />;
};

export default Usuarios;
