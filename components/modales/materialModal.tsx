import Swal from "sweetalert2";
import { supabase } from "@/service/apiConfig";
import { API_ROUTES, fetcher } from "@/service/apiConfig";

const MaterialModal = async (revalidateCallback: { (): Promise<void>; (): void; }) => {
  const { value: formValues, dismiss } = await Swal.fire({
    title: "Agregar Material",
    html: `
      <input id="nombre" class="swal2-input" placeholder="Nombre del producto" />
      <input id="saldo" class="swal2-input" placeholder="Saldo del producto" />
    `,
    confirmButtonText: "Agregar",
    focusConfirm: false,
    preConfirm: async () => {
      const nombreInput = Swal.getPopup()?.querySelector("#nombre") as HTMLInputElement;
      const saldoInput = Swal.getPopup()?.querySelector("#saldo") as HTMLInputElement;

      if (!nombreInput || !saldoInput) {
        Swal.showValidationMessage("Completa todos los campos");
        return false;
      }

      const nombre = nombreInput.value;
      const saldo = saldoInput.value;

      if (!nombre || !saldo) {
        Swal.showValidationMessage("Completa todos los campos");
        return false;
      }

      const saldoInt = parseInt(saldo, 10);
      if (isNaN(saldoInt)) {
        Swal.showValidationMessage("El saldo debe ser un número entero");
        return false;
      }

      try {
        // Verificar si el nombre del material ya existe en la tabla
        const existingMaterial = await supabase
          .from("Material")
          .select("name")
          .eq("name", nombre)
          .single();

        if (existingMaterial.data) {
          Swal.showValidationMessage("Ya existe un material con ese nombre");
          return false;
        }

        // Obtener la fecha actual
        const currentDate = new Date();

        // Realizar la inserción en Supabase utilizando la ruta definida en API_ROUTES
        const { data, error } = await supabase
          .from("Material")
          .insert([
            {
              name: nombre,
              quantity: saldoInt,
              userId: "test2",
              createdAt: currentDate.toISOString(),
              updatedAt: currentDate.toISOString(),
            },
          ])
          .select();

        if (error) {
          throw error;
        }

        // Obtener el id del material recién creado
        const materialId = data[0].id;

        // Registrar un nuevo movimiento de tipo entrada en la tabla InventoryMovement
        const { error: movementError } = await supabase
          .from("InventoryMovement")
          .insert([
            {
              movementType: "ENTRADA", // Ajusta el tipo de movimiento según tus necesidades
              quantity: saldoInt,
              materialId: materialId,
              userId: "test2",
              date: currentDate.toISOString(),
            },
          ])
          .select();
          
          if (movementError) {
          throw movementError;
        }

        // Invocar la función de devolución de llamada para revalidar los datos
        revalidateCallback();

        return true; // Indicar que la validación fue exitosa
      } catch (error) {
        console.error("Error al insertar en Supabase:", error);
        Swal.showValidationMessage("Error al insertar en la base de datos");
        return false;
      }
    },
  });

  if (formValues) {
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
      title: "Agregado correctamente",
    });
  } else if (dismiss === Swal.DismissReason.cancel) {
    // El usuario ha cerrado el modal
    console.log("Modal cerrado");
  } else {
    // Aquí maneja el caso de error o cancelación
    console.log("Error o cancelación");
  }
};

export default MaterialModal;
