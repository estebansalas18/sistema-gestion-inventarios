import Swal from "sweetalert2";

export const UsuarioModal = async () => {
  Swal.fire({
    title: "Qué rol desea asignarle al usuario?",
    showDenyButton: true,
    confirmButtonText: "USER",
    denyButtonText: `ADMIN`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Nuevo rol: USER", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Nuevo rol: ADMIN", "", "success");
    }
  });
};
