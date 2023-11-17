import { User, Role, InventoryMovement, Material } from '@prisma/client';

export interface UsersQuery {
  users: User[];
}

export interface RolesQuery {
    roles: Role[];
}

export interface InventoryMovementQuery {
    inventoryMovements: InventoryMovement[];
}

export interface MaterialsQuery {
    materials: Material[];
}
