import Swal from "sweetalert2";

interface InventarioModalProps {
  name: string;
}

export const InventarioModal = async ({ name }: InventarioModalProps) => {
  Swal.fire({
    title: "Agregar Movimiento para " + name,
    html: `
      <input id="saldo" class="swal2-input" placeholder="Saldo del producto" />
    `,
    input: "select",
    inputOptions: {
      entrada: "Entrada",
      salida: "Salida",
    },
    inputPlaceholder: "Seleccionar tipo de movimiento",
    showCancelButton: true,
    confirmButtonText: "Agregar Movimiento",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Se agregó el movimiento correctamente.", "", "success");
    } else if (result.isDenied) {
      Swal.fire("No fue agregado el movimiento", "", "error");
    }
  });
};
