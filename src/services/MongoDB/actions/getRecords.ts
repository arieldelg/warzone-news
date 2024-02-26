
import authOptions from "app/app/api/auth/[...nextauth]/options"
import { env } from "app/config/env"
import { getServerSession } from "next-auth"


const getRecords = async () => {
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
                            }
                          ] 
                    }),
                    next: {
                        tags: ['records']
                    }
                })
                const { documents } = await response.json()
                const newData = documents.map((element: any) => {
                    const {_id, nombre, quantity, proyecto, category, createdAt } = element
                    const result = {
                        _id,
                        nombre,
                        cantidad: Number(quantity), 
                        proyecto,
                        category,
                        createdAt,
                        
                    }
                    return result
                })
                return newData
    } catch (error) {
        console.log(error)
    }
    return Response.json({ message: 'getting fetch' })
}

export { getRecords }