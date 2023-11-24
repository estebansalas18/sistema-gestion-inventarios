import React from "react";
import { FaBox, FaUser, FaLemon, FaSignOutAlt } from "react-icons/fa";
import { useSession, signOut  } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { PrivateComponent } from "./PrivateComponent";

const Sidebar = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { data , status} = useSession();
  const user = data?.user;
  const userRole = data?.user.role?.name;

  if(status === "loading") return <div>Cargando...</div>;
  if(status === "unauthenticated") return <div>Debes iniciar sesión</div>;

  const UserRoleBadge = ({ role }: { role: string }) => {
    if (role === "ADMIN") {
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
          ADMIN
        </span>
      );
    } else if (role === "USER") {
      return (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
          USER
        </span>
      );
    } else {
      return null;
    }
  };

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div className="flex flex-col items-center mb-4">
          <Image
            src={user?.image || ""}
            alt="Foto de Usuario"
            className="w-44 h-44 rounded-full mb-3 mt-20"
            width={150} height={150}
          />
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {user?.name}
            </p>
            <span>              
              <UserRoleBadge role={userRole} />
            </span>
          </div>
        </div>

        <ul className="space-y-2 font-medium mt-20">
          <li>
            <Link href="/inventarios"
              className={`flex items-center p-3 text-xl rounded-lg ${
                currentPath === "/inventarios"
                  ? "text-gray-100 bg-gray-500"
                  : "text-gray-500 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              } group`}
            >
                <FaBox className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Inventarios</span>
            </Link>            
          </li>
          <li>
            <Link
              href="/materiales"
              className={`flex items-center p-3 text-xl rounded-lg ${
                currentPath === "/materiales"
                  ? "text-gray-100 bg-gray-500"
                  : "text-gray-500 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              } group`}
            >
              <FaLemon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ms-3">Materiales</span>
            </Link>
          </li>          
          <PrivateComponent roleName="ADMIN">
            <li>
                <Link
                  href="/usuarios"
                  className={`flex items-center p-3 text-xl rounded-lg ${
                    currentPath === "/usuarios"
                      ? "text-gray-100 bg-gray-500"
                      : "text-gray-500 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  } group`}
                >
                  <FaUser className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Usuarios</span>
                </Link>
              </li>
            </PrivateComponent>
          <li>
            <button 
              onClick={() => {signOut()}}
              type="button"
              className="flex items-center w-full p-3 text-xl text-gray-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaSignOutAlt className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ms-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export { Sidebar };
