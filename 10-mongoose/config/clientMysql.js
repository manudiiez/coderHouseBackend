import createKnexClient from 'knex';

const mysqlConfig = {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ecommerce2',
        port: 3306
      }
}

export const clienteSql = createKnexClient(mysqlConfig);