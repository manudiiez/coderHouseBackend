import { clienteSql } from '../utils/client.js';

export const createTableProductos = async() => {
    try {
        const table = await clienteSql.schema.hasTable('productos');
        if (!table) {
            await clienteSql.schema.createTable('productos', table => {
                table.string('id', 255);
                table.string('name', 255);
                table.integer('price', 11);
                table.string('description', 255);
                table.string('image', 255);
            });
        }
    } catch (error) {
        throw error;
    }
}

export const createTableChat = async() => {
    try {
        const table = await clienteSql.schema.hasTable('chat');
        if (!table) {
            await clienteSql.schema.createTable('chat', table => {
                table.string('id', 255);
                table.string('email', 255);
                table.string('date', 255);
                table.string('text', 255);
            });
        }
    } catch (error) {
        throw error;
    }
}