'use server'
import { env } from "app/config/env"

const getOneRecord = async (id: string) => {
    try {
        const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-zagrc/endpoint/data/v1/action/findOne',{
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
            "filter": {
                "_id": {"$oid": id}
            } 
        }),
    })
    if(!response.ok) {
        return Response.json({ error: 'error en el fetching' })
    }
    const { document } = await response.json()
    return document
    } catch (error) {
        console.log(error)
    }

}

export { getOneRecord }