import Swal from "sweetalert2";

interface UsuarioModalProps {
  name: string;
  email: string;
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
    confirmButtonText: "Editar Usuario",
  }).then((result) => {
    if (result.isConfirmed) {
      
      Swal.fire("Se actualizo el ususario correctamente.", "", "success");
    } else if (result.isDenied) {
      Swal.fire(
        "No fue posible actualizar la información del usuario",
        "",
        "error"
      );
    }
  });
};
