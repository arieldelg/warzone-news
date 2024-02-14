import { signJwtAccesToken } from "app/lib/jwt"
import { connectMongoDB } from "app/services/MongoDB/connection/entry-app"
import { User } from "app/services/MongoDB/connection/model"
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server"

interface RequestBody {
    email: string,
    password: string
}

export async function POST (request: Request) {
    try {
        await connectMongoDB()
        const { email, password }: RequestBody = await request.json()
        
        const arrayUser = await User.find({ email })
        const user = arrayUser[0]
           
        if(!user.email) {
            return null
        }    
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch) {
            return null
        } else {
            const data = {
                name: user.name,
                email: user.email,
                role: user.role,
                _id: user._id
            }
            const accesToken = signJwtAccesToken(data)
            const result = {
                ...data,
                accesToken
            }
            return new NextResponse(JSON.stringify( result ))
        }
    } catch (error) {
        return new NextResponse(JSON.stringify(null))
    }
}

