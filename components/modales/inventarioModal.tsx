import Swal from "sweetalert2";
import { MaterialService } from "@/service/materialservice";
import { InventoryMovementService } from "@/service/inventoryMovementService";

interface InventarioModalProps {
  name: string;
}

interface InventarioModalProps {
  name: string;
  revalidateMovements: () => void;
}

const InventarioModal = async ({ name, revalidateMovements }: InventarioModalProps): Promise<void> => {
  const { value: formValues, isConfirmed } = await Swal.fire({
    title: "Agregar Movimiento para " + name,
    html: `
      <input id="saldo" class="swal2-input" placeholder="Saldo del producto" />
      <select id="movementType" class="swal2-select" placeholder="Seleccionar tipo de movimiento">
        <option value="ENTRADA">Entrada</option>
        <option value="SALIDA">Salida</option>
      </select>
    `,
    showCancelButton: true,
    confirmButtonText: "Agregar Movimiento",
    focusConfirm: false,
    preConfirm: async () => {
      const saldoInput = Swal.getPopup()?.querySelector("#saldo") as HTMLInputElement;

      
      const movementTypeInput = Swal.getPopup()?.querySelector("#movementType") as HTMLSelectElement;

      if (!saldoInput || !movementTypeInput) {
        Swal.showValidationMessage("Completa todos los campos");
        return false;
      }

      const saldo = saldoInput.value;
      console.log(saldo);
      const movementType = movementTypeInput.value;
      console.log(movementType);

      if (!saldo || !movementType) {
        Swal.showValidationMessage("Completa todos los campos");
        return false;
      }

      const saldoInt = parseInt(saldo, 10);
      if (isNaN(saldoInt)) {
        Swal.showValidationMessage("El saldo debe ser un número entero");
        return false;
      }

      try {
        // Obtener el ID del material por su nombre
        const materialId = await MaterialService.getMaterialIdByName(name);

        // Crear el movimiento de inventario
        await InventoryMovementService.createInventoryMovement(
          movementType,
          saldoInt,
          materialId,
          "test2"
        );
        // Invocar la función de devolución de llamada para revalidar los datos
        revalidateMovements();
        return true; // Indicar que la validación fue exitosa
      } catch (error) {
        console.error("Error al insertar en Supabase:", error);
        Swal.showValidationMessage("Error al insertar en la base de datos");
        return false;
      }
    },
  });

  if (isConfirmed) {
    // Aquí maneja el caso de éxito y muestra la notificación
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Movimiento agregado correctamente",
    });
  } else {
    // El usuario ha cerrado el modal
    console.log("Modal cerrado o cancelado");
  }
};

export { InventarioModal };