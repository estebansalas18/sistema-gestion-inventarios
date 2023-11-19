import Swal from "sweetalert2";

interface UsuarioModalProps {
  name: string;
}

export const UsuarioModal = async ({ name }: UsuarioModalProps) => {
  Swal.fire({
    title: "Cambiar rol de " + name,
    html: `
      <input id="email" class="swal2-input" placeholder="Cambiar email" />
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