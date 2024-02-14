import { env } from "app/config/env"
import { revalidatePath } from "next/cache"


const newRecordMiddleware = async (params:any, newWallet: any) => {
    const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-zagrc/endpoint/data/v1/action/updateOne', {
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
                "nombre_cuenta": params
              },
              "update": {
                "$set": {
                  "money": `${newWallet}`,
                }
              }
        }),
    })
    return response.status
}

export { newRecordMiddleware }