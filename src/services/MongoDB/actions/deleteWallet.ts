'use server'
import { revalidateTag } from "next/cache"
import { env } from "process"

const deleteWallet = async (id: string) => {
    try {
         const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-zagrc/endpoint/data/v1/action/deleteOne', {
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
                "filter":{
                      '_id': { '$oid': id} 
                    },
                }),
                
            })
            if(response.status > 300) {
                return Response.json({ error: 'error en el fetching deleteWallet' })
            }
            console.log(id)
            console.log('lo que sigue')
            const response2 = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-zagrc/endpoint/data/v1/action/deleteMany', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': `${env.MONGO_DB_WALLET}`
            },
            body: JSON.stringify({
                "collection":"enero",
                "database":"dataMetrics",
                "dataSource":"Cluster0",
                "filter":{
                      'proyectID': id
                    },
                }),
                
            })
            console.log(response2.status)
    
            revalidateTag('store')
    } catch (error) {
        console.log(error)
    }
}

export { deleteWallet }