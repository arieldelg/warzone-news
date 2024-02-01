import { connect } from "mongoose";
import { env } from "app/config/env";

export async function connectMongoDB () {
    try {
        await connect(env.MONGO_DB_AUTH!) //checar porque me da undefined
        console.log('connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}
