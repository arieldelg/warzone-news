
import authOptions from "app/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { connectWallet } from "../post-wallet/model"

const getData = async () => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return Response.json({ error: 'unauthorized' })
    }
    const response = await fetch('http://localhost:3000/api/user', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization': `${session?.accesToken}`
        },
    })
    if (!response.ok) {
        return Response.json({ error: 'token no authorized' })
    }
    const data = await connectWallet().find({ user_id: session?._id }).exec()
    const newData = data.map(element => {
        const {tipo_cuenta, tipo_moneda, user_id, _id, money, nombre_cuenta, isActive } = element
        const myObjectId = _id
        const id = myObjectId.toString()

        const result = {
            id,
            tipo_cuenta,
            tipo_moneda, 
            user_id,
            money,
            nombre_cuenta,
            isActive
        }
        return result
    })
    return newData
}

export { getData }