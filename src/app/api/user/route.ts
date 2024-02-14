import { verifyJwt } from "app/lib/jwt";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const accesToken = request.headers.get('Authorization');
    if (!accesToken || !verifyJwt(accesToken)) {
        return new Response(
            JSON.stringify({
                error: 'no estas autorizado'
            }),
            {
                status: 401
            }
        )
    }    
    return NextResponse.json({ message: 'authorizado' })
}

