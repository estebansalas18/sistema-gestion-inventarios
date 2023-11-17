// Dropdown.tsx
import React, { useRef, useEffect } from "react";

const Dropdown = ({ materialIds, materials, onSelect, isOpen, toggleDropdown }) => {
  const dropdownButtonRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [toggleDropdown]);

  return (
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
          const materialInfo = materials?.find((material) => material.id === materialId);

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
  );
};

export default Dropdown;
