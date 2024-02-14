import type { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";


const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},

            async authorize(credentials) {
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                })
                const user = await response.json()
                // console.log('usuario',user)
                if (user) {
                    return user
                } else {
                    return null
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
                token.accesToken = user.accesToken
                token._id = user._id
            } 
            // console.log('user async jwt',user)
            // console.log('token async jwt',token)
            return token
        },
        async session({ session, token }) {
            if(session.user) {
                session.role = token.role
                session._id = token._id
                session.accesToken = token.accesToken
            }
            // console.log('session async session',session)
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
}

export default authOptions