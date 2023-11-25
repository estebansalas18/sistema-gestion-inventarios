import { useRef, useEffect } from "react";

interface DropdownProps {
  materialIds: number[];
  materials: Array<{
    id: number;
    name: string;
  }>;
  onSelect: (materialId: number) => void;
  isOpen: boolean;
  handleDropdownToggle: () => void;
  toggleDropdown: (isOpen: boolean) => void;
}

const Dropdown = ({
  materialIds,
  materials,
  onSelect,
  isOpen,
  handleDropdownToggle,
  toggleDropdown,
}: DropdownProps) => {
  const dropdownButtonRef = useRef<HTMLButtonElement | null>();

  useEffect(() => {
    const handleOutsideClick = (event: { target: any }) => {
      if (
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        toggleDropdown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [toggleDropdown]);

  return (
    <div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        onClick={handleDropdownToggle}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Seleccionar Material{" "}
        <svg
          className={`w-2.5 h-2.5 ms-3 ${isOpen ? "transform rotate-180" : ""}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {materialIds.map((materialId) => {
            const materialInfo = materials?.find(
              (material) => material.id === materialId
            );

            return (
              <li key={materialId}>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => onSelect(materialId)}
                >
                  {materialInfo ? materialInfo.name : `Material ${materialId}`}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export { Dropdown };
