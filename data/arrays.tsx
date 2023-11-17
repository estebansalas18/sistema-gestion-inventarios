export const inventarios = [
  {
    id: 1,
    name: "Material 1",
    date: "2023-11-15",
    entrance: "Silver",
    exit: "Laptop",
    price: "$2999",
    responsible: "Juan Esteban Salas",
  },
];

export const inventarios_header: string[] = [
  "Identificador",
  "Fecha",
  "Entrada",
  "Salida",
  "Responsable",
];

export const inventarios_fields = [
  "id",
  "date",
  "entrance",
  "exit",
  "responsible",
];

export const materiales_header: string[] = [
  "Identificador",
  "Fecha de creación",
  "Nombre",
  "Saldo",
  "Creado por",
];

export const materiales_fields = [
  "id",
  "createdAt",
  "name",
  "quantity",
  "userId",
];

export const usuarios_header: string[] = [
  "Identificador",
  "Fecha de creación",
  "Correo",
  "Rol",
];

export const usuarios_fields = ["id", "emailVerified", "email", "roleId"];
