import createKnexClient from 'knex';

const mysqlConfig = {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ecommerce',
        port: 3306
      }
}

export const clienteSql = createKnexClient(mysqlConfig);