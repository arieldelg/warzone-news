"use server"
import { getServerSession } from "next-auth"
import authOptions from "app/app/api/auth/[...nextauth]/options"
import { UIData } from "../post-wallet/model"
import { revalidatePath } from "next/cache"
import { postWallet } from "../post-wallet/entry-point"

type WalletRequest = {
    nombre_cuenta: string,
    money: string,
    tipo_cuenta: string,
    tipo_moneda: string,
    isActive: boolean
}

const sentData = async (values: WalletRequest) => {
    const session = await getServerSession(authOptions)
    const { money, tipo_cuenta, tipo_moneda, nombre_cuenta, isActive } = values

    if(!session?.accesToken) {
        return Response.json({ error: 'no token found' })
    }
    const data = <UIData>({
        nombre_cuenta: nombre_cuenta, 
        money: money,
        tipo_cuenta: tipo_cuenta,
        tipo_moneda: tipo_moneda,
        user_id: session._id,
        isActive: isActive
    })

    if(!money && !tipo_cuenta && !tipo_moneda && !nombre_cuenta) {
        return Response.json({ error: 'need necesary parameters to fetch' })
    }

    await postWallet(data)
    return revalidatePath('/store')
    // return Response.json({ data })

}



export { sentData }