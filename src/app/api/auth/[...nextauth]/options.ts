import { env } from "app/config/env";
import { connectMongoDB } from "app/services/MongoDB/connection/entry-app";
import { User } from "app/services/MongoDB/connection/model";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import { signJwtAccesToken } from "app/lib/jwt";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials
                try {
                    await connectMongoDB()
                    const arrayUser = await User.find({ email })
                    const user = arrayUser[0]
                    if(!user.email) {
                        return null
                    }    
                    const passwordMatch = await bcrypt.compare(password, user.password)
                    if(!passwordMatch) {
                        return null
                    } 
                    return user
                } catch (error) {
                    console.log(error)
                }
                
            },
        }),
    ],
    session: {
        strategy: 'jwt'
        
    },
    callbacks: {
        async jwt({ token, user }) {
           
            if (user) {
                token.role = user.role
            } 
            console.log('user',user)
            console.log('token',token)
            return token
        },
        async session({ session, token }) {
            if(session.user) {
                session.user.role = token.role
                session.user.prueba = 'esto es una prueba'
            }
            console.log('session',session)
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    events: {

    }
}

export default authOptions