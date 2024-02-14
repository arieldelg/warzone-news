'use server'

import { revalidatePath } from "next/cache"
import { connectWallet } from "../post-wallet/model"

const isActive = async (nombreCuenta: any, isActive: any) => {
    if(isActive === true){
        await connectWallet().updateOne({ nombre_cuenta: nombreCuenta }, { isActive: false})
    } else {
        await connectWallet().updateOne({ nombre_cuenta: nombreCuenta }, { isActive: true})
    }
    return revalidatePath('/store')
}

export { isActive }