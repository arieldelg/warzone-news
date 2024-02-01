import { Schema, model, models } from "mongoose";

export interface IUser {
    name: string,
    email: string,
    password: string,
    role: string
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
    }, 
    {timestamps: true}
)

const User = models.User || model<IUser>('User', userSchema) // si no ponemos models.user tratara de sobrescribirlo

export { User }