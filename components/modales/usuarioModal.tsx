import Swal from "sweetalert2";
import { API_ROUTES } from "@/service/apiConfig";
import { mutate } from "swr";

interface UsuarioModalProps {
  name: string;
  email: string | undefined;
}

export const UsuarioModal = async ({ name, email }: UsuarioModalProps) => {
  Swal.fire({
    title: "Cambiar rol de " + name,
    html: `
      <input id="email" class="swal2-input" placeholder="Cambiar email" value="${email}" readonly/>
    `,
    input: "select",
    inputOptions: {
      admin: "ADMIN",
      user: "USER",
    },
    inputPlaceholder: "Seleccionar el rol del usuario",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Editar Usuario",
  }).then((result) => {
    if (result.isConfirmed) {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/8.4.2",
        },
        body: JSON.stringify({
          email: email,
          roleId: result.value.toUpperCase(),
        }),
      };
      fetch(API_ROUTES.users, options)
        .then((response) => {})
        .then(() => {
          window.location.reload();
          mutate(API_ROUTES.users);
          Swal.fire("Usuario actualizado correctamente", "", "success");
        })
        .catch((error) => {
          Swal.fire(
            "500 No fue posible actualizar la información del usuario",
            "",
            "error"
          );
        });
    } else if (result.isDenied) {
      Swal.fire(
        "No fue posible actualizar la información del usuario",
        "",
        "error"
      );
    }
  });
};
