'use server'

import { env } from "app/config/env"
import { revalidateTag } from "next/cache"
import { newRecordMiddleware } from "./newRecordMiddleware"

const deleteRecordMany = async (params: any, moneyData:any) => {
    let array: object[] = []
    moneyData.forEach((element1:any) => {
        let elemntMoney = element1.money
        params.forEach((element2:any) => {
            
            if(element2.proyecto === element1.proyecto) {
                elemntMoney -= element2.cantidad
            } else if ( element2.proyecto !== element1.proyecto) {
                return null
            }
        })
        array.push({
            money: elemntMoney,
            proyecto: element1.proyecto
        })
    })
    const newArray = array.filter((element:any) => {
        if(typeof element.money === 'number') {
            return {
                money: element.money,
                proyecto: element.proyecto
            }
        }
    })
    
    newArray.forEach(async (element:any) => {
        const response = await newRecordMiddleware(element.proyecto, element.money)
        console.log(response)
    })
    const id = params.map((element: any) => element._id)
    if(id.length > 0) {
        id.forEach(async (element: any) => {
    
            await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-zagrc/endpoint/data/v1/action/deleteMany', {
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
                      '_id': { '$oid': element} 
                    },
                }),
                
            })
            
        })
    }
    revalidateTag('store')
}

export { deleteRecordMany }