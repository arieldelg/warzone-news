'use server'
import { env } from "app/config/env"
import { revalidateTag } from "next/cache"

const updateOneRecord = async (values: any, id: any) => {
    try {
        const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-zagrc/endpoint/data/v1/action/updateOne',{
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
            },
            "update": {
                "$set": {
                    "nombre": values.nombre,
                    "quantity": String(values.quantity),
                    "proyecto": values.proyecto,
                    "category": values.category,
                    "descripcion": values.descripcion,
                    "updatedAt": new Date().toLocaleString()
                }
            } 
        }),
    })
    if(!response.ok) {
        return Response.json({ error: 'error en el fetching' })
    }
    revalidateTag('records')
    } catch (error) {
        console.log(error)
    }
}

export { updateOneRecord }