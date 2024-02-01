import { connectMongoDB } from "app/services/MongoDB/connection/entry-app"
import { User } from "app/services/MongoDB/connection/model"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"


export async function POST(res: any){
    try {

        const { name, password, email } = await res.json()
        // console.log(body)
    
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoDB()
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            role: 'user'
        })
        // console.log('user api/register',user)
        await user.save()
        return NextResponse.json({ message: 'user registered.'}, { status: 201 })
    } catch (error) {
       return NextResponse.json({ message: 'An Error Occurred'}, { status: 500 }) 
    }
}
