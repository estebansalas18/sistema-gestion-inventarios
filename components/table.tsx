import React from "react";
import { Button } from "@/components/button";

interface RowProps {
  id: number;
  createdAt: string;
  name: string;
  quantity: number;
  userId: number;
  [key: string]: string | number;
}

interface TableProps {
  headers: string[];
  rows: RowProps[];
  fieldsToShow?: string[];
  actions?: boolean;
  onClick: (row: RowProps) => void;
}

const Table = ({
  headers,
  rows,
  fieldsToShow,
  actions,
  onClick,
}: TableProps) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {headers.map((header, index) => (
            <th key={index} scope="col" className="px-6 py-3">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            {fieldsToShow?.map((field, colIndex) => (
              <td key={colIndex} className="px-6 py-4">
                {row[field]}
              </td>
            ))}
            {actions && (
              <td className="py-2 pl-4">
                <Button text="Editar" onClick={() => onClick(row)} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
