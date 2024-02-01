import { connectMongoDB } from "app/services/MongoDB/connection/entry-app"
import { User } from "app/services/MongoDB/connection/model"
import { NextResponse } from "next/server"

export async function POST (req: any) {
    try {
        await connectMongoDB()
        const response = await req.json()
        const user = await User.findOne({ email: response}).select("_id")
        if (user) {
            return NextResponse.json({ user })
        } else {
            return NextResponse.json({ message: 'usuario nuevo'})
        }
    } catch (error) {
        console.log(error)
    }
}

