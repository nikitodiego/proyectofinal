import contenedorMongoDB from "../controllers/contenedorMongoDB.js";

let instance = null

class Factory {

    static getInstance() {
        if (!instance) {
            instance = new Factory()
        }
        return instance
    }

    createPersistance() {
        if (process.env.DB === "mongo") return contenedorMongoDB.getInstance();
    }
}

export default Factory
