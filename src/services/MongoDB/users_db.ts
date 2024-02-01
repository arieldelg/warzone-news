import { env } from "app/config/env"
const data = {
    "collection":"list_users",
    "database":"users_db",
    "dataSource":"Cluster0",
    "projection": {}
    // "pipeline": [
    //     {
    //         '$match': {
    //           'address.country_code': 'US'
    //         }
    //       }, {
    //         '$sort': {
    //           'price': 1
    //         }
    //       }, {
    //         '$limit': 5
    //       }
    // ]
    // "filter": {
    //     "id": "1"
    // },
    // "update": {
    //     "$set": {
    //         "text": "modifico por 2"
    //     }
    // }
}

const getUsers = async () => {
    try {
        const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-zagrc/endpoint/data/v1/action/find', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'Authorization': `Bearer ${env.MONGO_DB_TOKEN}`
            },
            body: JSON.stringify(data)
        })
        const { documents } = await response.json()
        return documents
    } catch (error) {
        console.log(error)
    }
}


// const sample_airbnb = async () => {
//     try {
//         const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-zagrc/endpoint/data/v1/action/find', {
//             method: 'POST',
//             headers: {
                // 'Content-Type': 'application/json',
                // 'Access-Control-Request-Headers': '*',
                // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RldmljZV9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImJhYXNfZG9tYWluX2lkIjoiNjViNjIxOThiNzA0ZWViOTlmNjdiNzBiIiwiZXhwIjoxNzA2NDgwMTYyLCJpYXQiOjE3MDY0NzgzNjIsImlzcyI6IjY1YjZjYjFhZDNjOWRjOTk1YTRlNTA5OCIsInN0aXRjaF9kZXZJZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInN0aXRjaF9kb21haW5JZCI6IjY1YjYyMTk4YjcwNGVlYjk5ZjY3YjcwYiIsInN1YiI6IjY1YjZhNTlmYjcxZTVhOTYwMzlkMWQ5ZCIsInR5cCI6ImFjY2VzcyJ9.PIME-AWMKVWRdW2a5hij2Rjblwou5f4Wdsg3Ck-KKyc'
//             },
//             body: JSON.stringify(data)
//         })
//         const mongodata = response.json()
//         return mongodata
//     } catch (error) {
//         console.log(error)
//     }
// }


export { getUsers }