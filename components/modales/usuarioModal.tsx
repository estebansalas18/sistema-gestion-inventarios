import Swal from "sweetalert2";

export const UsuarioModal = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Editar usuario",
    html: `
        <input id="nombre" class="swal2-input" placeholder="Rol del usuario" />
      `,
    confirmButtonText: "Editar",
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
      title: "Editado correctamente",
    });
  }
};
