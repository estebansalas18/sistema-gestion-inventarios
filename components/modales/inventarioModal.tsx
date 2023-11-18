import Swal from "sweetalert2";

export const InventarioModal = async () => {
  Swal.fire({
    title: "Qué rol desea asignarle al usuario?",
    html: `
      <input id="saldo" class="swal2-input" placeholder="Saldo del producto" />
    `,
    showDenyButton: true,
    confirmButtonText: "Sumar",
    denyButtonText: `Restar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Fue añadido el saldo correctamente", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Fue restado el saldo correctamente", "", "success");
    }
  });
};
