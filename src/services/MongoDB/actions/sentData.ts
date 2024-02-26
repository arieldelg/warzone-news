"use server"
import { getServerSession } from "next-auth"
import authOptions from "app/app/api/auth/[...nextauth]/options"
import { UIData } from "../post-wallet/model"
import { revalidateTag } from "next/cache"
import { postWallet } from "../post-wallet/entry-point"

const sentData = async (values: UIData) => {
    const session = await getServerSession(authOptions)
    const { money, tipo_cuenta, tipo_moneda, nombre_cuenta, isActive, color, colorTailwind } = values

    if(!session?.accesToken) {
        return Response.json({ error: 'no token found' })
    }
    const data = <UIData>({
        nombre_cuenta, 
        money,
        tipo_cuenta,
        tipo_moneda,
        user_id: session._id,
        isActive,
        color,
        colorTailwind
    })

    if(!money && !tipo_cuenta && !tipo_moneda && !nombre_cuenta) {
        return Response.json({ error: 'need necesary parameters to fetch' })
    }
    console.log(data)
    await postWallet(data)
    return revalidateTag('store')
    // return Response.json({ data })

}



export { sentData }