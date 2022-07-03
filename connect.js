import mongoose from "mongoose"

export async function connect() {
    try {
        mongoose.connect(process.env.KEY)
        console.log("DB is connected")
    } catch (e) {
        console.log(e)
    }
}