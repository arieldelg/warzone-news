'use server'
import { revalidateTag } from "next/cache"
import { env } from "process"


const updateSelectedWallet = async (name: any, wallet: any) => {
    const isTrue = wallet.filter((element: any) => element.isActive === true)
    const nombre = isTrue.map((element: any) => element.nombre_cuenta)
    if(nombre.length > 0) {
        await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-zagrc/endpoint/data/v1/action/updateOne', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Headers': '*',
                    'api-key': `${env.MONGO_DB_WALLET}`
                },
                body: JSON.stringify({
                    "collection":"wallets",
                    "database":"postWallet",
                    "dataSource":"Cluster0",
                    "filter": {
                        "nombre_cuenta": `${nombre[0]}`
                    },
                    "update": {
                        "$set": {"isActive": false}
                    }
                })
            })
    }
         await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-zagrc/endpoint/data/v1/action/updateOne', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': `${env.MONGO_DB_WALLET}`
            },
            body: JSON.stringify({
                "collection":"wallets",
                "database":"postWallet",
                "dataSource":"Cluster0",
                "filter": {
                    "nombre_cuenta": `${name}`
                },
                "update": {
                    "$set": {"isActive": true}
                }
            })
        })
        
        revalidateTag('store')

}

export {updateSelectedWallet}


    // console.log(name)
