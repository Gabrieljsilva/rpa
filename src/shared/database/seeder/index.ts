import { createConnection } from 'typeorm';
import { seedRoles } from './seeders/roles';
import { seedResources } from './seeders/resources';
import { seedPermissions } from './seeders/permissions';

(async () => {
  const connection = await createConnection();
  await seedRoles(connection, ['guest']);
  await seedResources(connection, ['/', '/users', '/auth/login']);
  await seedPermissions(connection, [
    {
      role: 'guest',
      method: 'GET',
      resource: '/',
    },
    {
      role: 'guest',
      method: 'POST',
      resource: '/users',
    },
    {
      role: 'guest',
      method: 'GET',
      resource: '/users',
    },
    {
      role: 'guest',
      method: 'POST',
      resource: '/auth/login',
    },
  ]);
})();
