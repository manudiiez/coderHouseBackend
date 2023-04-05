import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { personasService } from './personaService.js';


const schema = buildSchema(`

    type Persona {
        id: ID!
        nombre: String!
        edad: Int!
    }


    input DatosNuevaPersona {
        nombre: String!
        edad: Int!
    }
    input DatosActualizarPersona {
        nombre: String
        edad: Int
    }

    type Query {
        getPersona(id: ID!): Persona
        getPersonas(campo: String, valor: String): [Persona]
    }
   
    type Mutation {
        createPersona(datos: DatosNuevaPersona!): Persona
        updatePersona(id: ID!, datos: DatosActualizarPersona!): Persona
        deletePersona(id: ID!): Persona
    }
`)


// obtiene un id de tipo ID y devuelve una Persona
// type Query {
//     getPersona(id: ID!): Persona
//     getPersonas(campo: String, valor: String): [Persona]
// }

export const graphQLRouter = graphqlHTTP({
    schema,
    rootValue: {
        getPersona: ({ id }) => { return personasService.getById(id) }
    }
});