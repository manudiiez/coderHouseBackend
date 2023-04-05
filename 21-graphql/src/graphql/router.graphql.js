import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema.graphql.js'
import ControladorProductos from '../controllers/controllerProductos.js';
import { ContendorProductosDAO } from '../persistence/daos/factory.js';


const controllerProductos = new ControladorProductos(ContendorProductosDAO)


export const graphQLRouter = graphqlHTTP({
  schema,
  rootValue: {
    getProductos: async () => ContendorProductosDAO.getAll(),
    getProducto: async (_id) => ContendorProductosDAO.getById(_id._id),
    createProducto: async (producto) => ContendorProductosDAO.save(producto.datos),
    updateProducto: async (_id) => ContendorProductosDAO.updateById(_id._id, _id.datos),
    deleteProducto: async (_id) => ContendorProductosDAO.deleteById(_id._id)
  }
});

