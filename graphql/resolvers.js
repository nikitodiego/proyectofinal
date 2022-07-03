import productSchema from '../models/productos.js'

export const resolvers = {
    Query: {
        async products(){
            return await productSchema.find()
        },
        async productById(root, args){
            return await productSchema.find({ _id: args._id })
        }
    },
    Mutation: {
        async createProduct(_, { input }) {
            const newProduct = new productSchema(input)
            await newProduct.save();
            return newProduct;
        },
        async deleteProduct(_, { _id }) {
            return await productSchema.findByIdAndDelete(_id)
        },
        async updateProduct(_, { _id, input }) {
            return await productSchema.findByIdAndUpdate(_id, input, { new: true })
        }
    }
}