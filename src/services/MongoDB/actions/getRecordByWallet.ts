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
                const newArray = [...newData]
                // const data: any[] = []
                // const newMonth = newArray.forEach((element:any) => {
                //     if(data.length === 0) {
                //         data.push({
                //             day: element.dayCreatedObject.day,
                //             category: element.category,
                //             money: element.money
                //         })
                //     }

                //     if(data.find(element.))
                // })
                const day: string[] = []
                const recordCategory: string[] = []
                const dayAndCategory: any[] = []
                const dataPerDay: any[] = []
                newArray.forEach((element: any) => {
                    if(!recordCategory.includes(element.category)) {
                        recordCategory.push(element.category)
                    }
                })
                // newArray.forEach((element: any) => {
                //     if(!day.includes(element.dayCreatedObject.day) && !day.includes(element.category)) {
                //         day.push(element.dayCreatedObject.day)
                //     }
                // })
                newArray.forEach((element: any) => {
                    if(!day.includes(element.dayCreatedObject.day) && !day.includes(element.category)) {
                        day.push(element.dayCreatedObject.day)
                        // dayAndCategory.push({
                        //     day: element.dayCreatedObject.day,
                        //     category: element.category
                        // })
                    }
                    if(day.includes(element.dayCreatedObject.day) && !day.includes(element.category)) {
                        dayAndCategory.push({
                            day: element.dayCreatedObject.day,
                            category: element.category,
                            money: element.money
                        })
                    }
                    // if()
                })

                let array: any[] = []
                day.forEach((element, index: any) => {
                    let money = 0
                    dayAndCategory.forEach((element2: any) => {
                        console.log(index)
                        if(element2.day === day[index] && element2.category === recordCategory[index] && element === day[index]) {
                            money += element2.money
                        } 
                    })
                    array.push(money)
                })
                console.log('array',array)
                console.log('day',day)
                console.log('newArray',recordCategory)
                console.log('dayandcategory',dayAndCategory)
                // // return newData

    } catch (error) {
        console.log(error)
    }
    return Response.json({ message: 'getting fetch' })
}

export { getRecordByWallet }


