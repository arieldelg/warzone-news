import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

interface Session { // este es para el session en async session
    _id: string | unknown,
    role: string,
    prueba: string,
    accesToken: string | unknown
}


declare module "next-auth" {
    interface DefaultSession extends Session {} 
    
    interface User extends DefaultUser { /// este es para el usuario en async jwt
        _id: string | unknown,
        role: string,
        prueba: string,
        accesToken: string,
    }
}



declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT { // este es para el token en async session
        role: string,
        accesToken: string | unknown,
        _id: string | unknown
    }
}