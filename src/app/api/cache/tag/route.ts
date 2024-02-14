import { revalidateTag } from "next/cache";

const POST = async (request: Request) => {
    console.log('hola')
    const body = await request.json()
    const { tag, token } = body
    console.log('este es el tag',tag)
    if(!tag || !token.accesToken) {
        return Response.json({ error: 'mising token' });
    }

    if(token.accesToken !== token.accesToken) {
        return Response.json({ error: 'invalid token'})
    }
    
    revalidateTag(tag)
    return Response.json({ succes: true })
}

export default POST