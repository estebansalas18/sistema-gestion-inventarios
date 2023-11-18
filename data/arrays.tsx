export const inventarios_header: string[] = [
  "Identificador",
  "Fecha",
  "Entrada",
  "Salida",
  "Responsable",
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
  "Acciones",
];

export const usuarios_fields = ["id", "emailVerified", "email", "roleId"];
