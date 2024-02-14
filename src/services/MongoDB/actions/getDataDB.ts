import { env } from "app/config/env"


const getDataDB = async () => {
    const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-zagrc/endpoint/data/v1/action/aggregate', {
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
            "pipeline": [
                {
                    '$match': {
                    'user_id': '65c269df2e45c7af74fd615d'
                    }
                }
            ]
        }),
        next:{
            tags: ['store', 'records'],
            
        }
    })
    const { documents } = await response.json()
    return documents
}

export {getDataDB}
