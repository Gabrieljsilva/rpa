import { EntityManager } from 'typeorm';

interface OperationsInterface {
  create: Array<string>;
  retrieve: Array<string>;
  update: Array<string>;
  delete: Array<string>;
}

interface StoreParams {
  role_id: string;
  operation_id: string;
  resource_id: string;
}

export class Permission {
  private role: string;
  private operations: OperationsInterface;
  private manager: EntityManager;

  constructor(
    role: string,
    operations: OperationsInterface,
    manager: EntityManager,
  ) {
    this.role = role;
    this.operations = operations;
    this.manager = manager;
  }

  public async save() {
    const role_id = await this.getRoleId(this.role);
    for (const [operation, resources] of Object.entries(this.operations)) {
      const operation_id = await this.getOperationId(operation);

      resources.forEach(async (resource) => {
        const resource_id = await this.getResourceId(resource);

        await this.store({ role_id, operation_id, resource_id });
      });
    }
  }

  public async store(params: StoreParams) {
    await this.manager.insert('permissions', [params]);
  }

  private async getRoleId(roleName: string) {
    const query = 'SELECT * FROM roles WHERE name = $1';
    const result = await this.manager.query(query, [roleName]);
    try {
      const [role] = result;
      return role.id;
    } catch (error) {
      throw new Error('role does not exists');
    }
  }

  private async getOperationId(operationName: string) {
    const query = 'SELECT * FROM crud_operations WHERE name = $1';
    const result = await this.manager.query(query, [operationName]);
    try {
      const [{ id }] = result;
      return id;
    } catch (error) {
      throw new Error('operation does not exists');
    }
  }

  private async getResourceId(resourceName: string) {
    const query = 'SELECT * FROM resources WHERE name = $1';
    const result = await this.manager.query(query, [resourceName]);
    try {
      const [{ id }] = result;
      return id;
    } catch (error) {
      throw new Error('resource does not exists');
    }
  }
}
