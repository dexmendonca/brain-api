import knexConfig from './database.config';

describe('Knex Configuration', () => {
  test('should have defined configuration', () => {
    expect(knexConfig).toBeDefined();
  });

  test('should have valid client configuration', () => {
    expect(knexConfig.client).toBe('pg');
  });

  test('should have valid connection settings', () => {
    const { connection } = knexConfig  as any;
    expect(connection).toBeDefined();
    expect(connection.host).toBeDefined();
    expect(connection.port).toBeDefined();
    expect(connection.database).toBeDefined();
    expect(connection.user).toBeDefined();
    expect(connection.password).toBeDefined();
  });

  test('should have valid pool settings', () => {
    const { pool } = knexConfig  as any;
    expect(pool).toBeDefined();
    expect(pool.min).toBeDefined();
    expect(pool.max).toBeDefined();
    expect(typeof pool.min).toBe('number');
    expect(typeof pool.max).toBe('number');
  });

  test('should have valid migrations settings', () => {
    const { migrations } = knexConfig as any;
    expect(migrations).toBeDefined();
    expect(migrations.tableName).toBe('migrations');
    expect(migrations.directory).toBeDefined();
  });

  test('should have valid seeds settings', () => {
    const { seeds } = knexConfig  as any;
    expect(seeds).toBeDefined();
    expect(seeds.directory).toBeDefined();
  });
});