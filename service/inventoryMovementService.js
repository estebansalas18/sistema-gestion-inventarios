// inventoryMovementService.js
import { supabase } from "./apiConfig";
import { MaterialService } from "@/service/materialservice";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";

const InventoryMovementService = {

  getAllInventoryMovements: async () => {
    try {
      const { data, error } = await supabase
        .from("InventoryMovement")
        .select();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error al obtener movimientos de inventario en Supabase:", error);
      throw error;
    }
  },

  createInventoryMovement: async (movementType, quantity, materialId, userId) => {
    try {
      // Obtener el saldo actual del material
      const materialBalance = await MaterialService.getMaterialBalance(materialId);

      // Validar si la cantidad de salida es mayor al saldo
      if (movementType === "SALIDA" && quantity > materialBalance) {
        // Muestra un toast indicando que la cantidad de salida es mayor al saldo
        throw { toast: "La cantidad de salida es mayor al saldo actual del material", type: "error" };
      }

      // Crear el movimiento de inventario
      const movementId = uuidv4();
      const { data: newMovement, error: movementError } = await supabase
        .from("InventoryMovement")
        .insert([
          {
            id: movementId,
            movementType,
            quantity,
            materialId,
            userId,
            date: new Date().toISOString(),
          },
        ])
        .select();

      if (movementError) {
        throw "Error al insertar el movimiento de inventario";
      }

      // Actualizar el saldo del material solo en caso de salida
      if (movementType === "SALIDA") {
        await supabase
          .from("Material")
          .update({ quantity: materialBalance - quantity })
          .eq("id", materialId);
      }

      if (movementType === "ENTRADA") {
        await supabase
          .from("Material")
          .update({ quantity: materialBalance + quantity })
          .eq("id", materialId);
      }

      return newMovement[0];
    } catch (error) {
      console.error("Error al crear el movimiento de inventario:", error);

      // Verifica si el error es un toast y lo muestra
      if (error.toast) {
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
          icon: error.type || "error",
          title: error.toast,
        });
      }

      throw error;
    }
  },

};

export { InventoryMovementService };
