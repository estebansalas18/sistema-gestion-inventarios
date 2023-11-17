import Swal from "sweetalert2";

export const MaterialModal = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Agregar Material",
    html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre del producto" />
        <input id="saldo" class="swal2-input" placeholder="Saldo del producto" />
      `,
    confirmButtonText: "Agregar",
    focusConfirm: false,
  });

  if (formValues && formValues.length === 2) {
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
  }
};
