import { supabase } from "@/service/apiConfig";

const MaterialService = {
  getAllMaterials: async () => {
    try {
      const { data, error } = await supabase
        .from("Material")
        .select();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error al obtener materiales en Supabase:", error);
      throw error;
    }
  },
  
  createMaterial: async (nombre, saldoInt, userId) => {
    try {
      const currentDate = new Date();
      const { data, error } = await supabase
        .from("Material")
        .insert([
          {
            name: nombre,
            quantity: saldoInt,
            userId: userId,
            createdAt: currentDate.toISOString(),
            updatedAt: currentDate.toISOString(),
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      return data[0]; // Devolver el material creado
    } catch (error) {
      console.error("Error al crear material en Supabase:", error);
      throw error;
    }
  },

  checkMaterialExists: async (nombre) => {
    try {
      const { data } = await supabase
        .from("Material")
        .select("name")
        .eq("name", nombre)
        .single();

      return !!data; // Devuelve true si el material existe, false si no existe
    } catch (error) {
      console.error("Error al verificar la existencia del material en Supabase:", error);
      throw error;
    }
  },

  getMaterialBalance: async (materialId) => {
    try {
      const { data, error } = await supabase
        .from("InventoryMovement")
        .select("quantity, movementType")
        .eq("materialId", materialId);

      if (error) {
        throw error;
      }

      // Calcular el saldo actual del material
      const balance = data.reduce((acc, movement) => {
        return movement.movementType === "ENTRADA"
          ? acc + movement.quantity
          : acc - movement.quantity;
      }, 0);

      return balance;
    } catch (error) {
      console.error("Error al obtener el saldo del material:", error);
      throw error;
    }
  },

  getMaterialIdByName: async (materialName) => {
    try {
      const { data, error } = await supabase
        .from("Material")
        .select("id")
        .eq("name", materialName)
        .single();

      if (error) {
        throw error;
      }

      return data.id;
    } catch (error) {
      console.error("Error al obtener el ID del material:", error);
      throw error;
    }
  },

getMaterialQuantity: async (materialId) => {
  try {
    const response = await supabase
      .from("Material")
      .select("quantity")
      .eq("id", materialId)
      .single();

    if (response.error) {
      throw response.error;
    }

    return response.data.quantity || 0;
  } catch (error) {
    console.error("Error al obtener la cantidad del material en Supabase:", error);
    throw error;
  }
},
};
export default MaterialService;
