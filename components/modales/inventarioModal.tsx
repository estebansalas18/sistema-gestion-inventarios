import Swal from "sweetalert2";

export const InventarioModal = async () => {
  const handleSumar = () => {
    // Lógica para cuando se selecciona "Sumar"
    console.log("Sumar");
    // Puedes agregar más lógica aquí según tus necesidades
  };

  const handleRestar = () => {
    // Lógica para cuando se selecciona "Restar"
    console.log("Restar");
  };

  const { value: formValues } = await Swal.fire({
    title: "Agregar Movimiento",
    html: `
          <input id="saldo" class="swal2-input" placeholder="Saldo del Movimiento" />
        `,
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonText: "Sumar",
    cancelButtonText: "Restar",
    focusConfirm: false,
    focusCancel: false,
  });

  if (formValues && formValues.length === 1) {
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

    if (formValues.isConfirmed) {
      Toast.fire({
        icon: "success",
        title: "Sumado correctamente",
      });
      // Llamar a una función para manejar la lógica de suma
      handleSumar();
    } else {
      Toast.fire({
        icon: "success",
        title: "Restado correctamente",
      });
      // Llamar a una función para manejar la lógica de resta
      handleRestar();
    }
  }
};
