import { getProducts } from "app/services/shopify/products"
import { NextResponse } from "next/server"

const GET = async () => {
    const products = await getProducts()
    return Response.json({ products })
}

export { GET }

// export async function GET() {
//     const message = 'hola'
//     return Response.json({message})
// }