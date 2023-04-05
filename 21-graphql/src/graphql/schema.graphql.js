import { buildSchema } from 'graphql';

export const schema = buildSchema(`

    type Producto {
        _id: ID!
        name: String!
        price: Int!
        description: String!
    }

    type Message {
        message: String
    }


    input DatosNuevoProducto {
        name: String!
        price: Int!
        description: String!
    }

    input DatosActualizarProducto {
        name: String
        price: Int
        description: String
    }

    type Query {
        getProducto(_id: ID!): Producto
        getProductos(campo: String, valor: String): [Producto]
    }

    type Mutation {
        createProducto(datos: DatosNuevoProducto!): Producto
        updateProducto(_id: ID!, datos: DatosActualizarProducto!): Producto
        deleteProducto(_id: ID!): Message
    }
`)

