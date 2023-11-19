import Swal from "sweetalert2";

interface ButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  title?: string; // Añade 'title' como propiedad opcional
}

export const Button = ({ onClick, text, disabled, title }: ButtonProps) => {
  const handleClick = () => {
    if (disabled && title) {
      Swal.fire({
        title: title,
        icon: "error",
      });
    } else {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={`focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
