import { Schema, createConnection } from "mongoose"
import { env } from "app/config/env"

export interface UIData {
    nombre_cuenta: string,
    money: string,
    tipo_cuenta: string,
    tipo_moneda: string,
    user_id: string | unknown,
    isActive: boolean
}

export const DataSchema = new Schema<UIData>({
    nombre_cuenta: {type: String, required: true},
    money: { type: String, required: true },
    tipo_cuenta: { type: String, required: true },
    tipo_moneda: { type: String, required: true },
    user_id: { type: String, required: true },
    isActive: { type: Boolean, required: true }
}, {timestamps: true}
)

const connectWallet = () => {
    const connection = createConnection(env.MONGO_DB_POST_WALET!)
    const Wallet = connection.model<UIData>('Wallet', DataSchema)
    return Wallet
}

export { connectWallet }





