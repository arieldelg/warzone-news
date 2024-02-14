'use server'
import authOptions from "app/app/api/auth/[...nextauth]/options"
import { env } from "app/config/env"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"
import { newRecordMiddleware } from "./newRecordMiddleware"


const newRecord = async (values:any, moneyData:any) => {
    const session = await getServerSession(authOptions)
    const findProyect = moneyData.find((element:any) => element.proyecto === values.proyecto)
    const split = findProyect.money.split(',').join('')
    const newWallet = Number(split) + Number(values.quantity)
    try {
        const response = await newRecordMiddleware(values.proyecto, newWallet)
        console.log(response)
        if(response < 300) {
            await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-zagrc/endpoint/data/v1/action/insertOne', {
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
                            "document": {
                                "nombre": values.nombre,
                                "quantity": values.quantity,
                                "proyecto": values.proyecto,
                                "category": values.category,
                                "descripcion": values.descripcion,
                                "createdAt": new Date().toLocaleString(),
                                "updatedAt": new Date().toLocaleString(),
                                "user_id": session?._id
                            }
                        })
                    })

                    revalidateTag('records')
        } else {
            return Response.json({ error: 'error'})
        }
    } catch (error) {
        console.log(error)
    }
    return Response.json({ message: 'Data is sending' })
}

export { newRecord}