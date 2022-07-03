import { makeExecutableSchema } from 'graphql-tools';
import {resolvers} from './resolvers.js'

const typeDefs = `

    type Query {
        products: [Products]
        productById(_id: ID): [Products]
    }

    type Products {
        _id: ID
        title: String!
        price: Int!
        thumbnail: String!
        stock: Int!
    }

    type Mutation {
        createProduct(input: prodInput) : Products
        deleteProduct(_id: ID): Products
        updateProduct(_id: ID, input: prodInput) : Products
    }

    input prodInput {
        title: String!
        price: Int!
        thumbnail: String!
        stock: Int!
    }
`;

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
})