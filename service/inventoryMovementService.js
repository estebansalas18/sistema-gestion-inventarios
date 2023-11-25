// inventoryMovementService.js
import { supabase } from "./apiConfig";
import { MaterialService } from "@/service/materialservice";
import { v4 as uuidv4 } from 'uuid';


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
        console.log("Se vino derecho")
        throw "Se vino derecho";
      }

      // Obtener el saldo actual del material
      const materialBalance = await MaterialService.getMaterialBalance(materialId);

      // Actualizar el saldo del material
      await supabase
        .from("Material")
        .update({ quantity: materialBalance })
        .eq("id", materialId);

      return newMovement[0];
    } catch (error) {
      console.error("Error al crear el movimiento de inventario:", error);
      throw error;
    }
  },

};

export { InventoryMovementService };
