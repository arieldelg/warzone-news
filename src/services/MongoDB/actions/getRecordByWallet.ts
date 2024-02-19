'use server'
import authOptions from "app/app/api/auth/[...nextauth]/options"
import { env } from "app/config/env"
import dayjs from "dayjs"
import { getServerSession } from "next-auth"


const getRecordByWallet = async (name: string, month: number) => {
    const session = await getServerSession(authOptions)
    try {
        const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-zagrc/endpoint/data/v1/action/aggregate', {
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
                        "pipeline":[
                            {
                              '$match': {
                                'user_id': `${session?._id}`
                              }
                            },
                            {
                                '$match': {
                                    'proyecto': name
                                  } 
                            },
                            {
                                '$match': {
                                  "dayCreatedObject.month": month
                                }
                            }
                          ] 
                    }),
                    next: {
                        tags: ['records']
                    }
                })
                const { documents } = await response.json()
                const newData = documents.map((element: any) => {
                    const {_id, nombre, quantity, proyecto, category, createdAt, dayCreatedObject } = element
                    const result = {
                        dayCreatedObject,
                        name: nombre,
                        money: Number(-quantity), 
                        category
                    }
                    return result
                })
                return newData

    } catch (error) {
        console.log(error)
    }
    return Response.json({ message: 'getting fetch' })
}

export { getRecordByWallet }