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
  "userId",
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
