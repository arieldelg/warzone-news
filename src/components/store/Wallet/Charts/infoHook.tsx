'use client'
import { getRecordByWallet } from "app/services/MongoDB/actions/getRecordByWallet"
import { generateDate } from "app/util/calendar"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

type WalletMonth = {
    walletByMonth: object[],
    setWalletByMonth: React.Dispatch<React.SetStateAction<object[]>>
}
type MonthState = {
    month: number[],
    setMonth: React.Dispatch<React.SetStateAction<number[]>>
}


const infoHook = (name: string[]) => {
    const day = dayjs()
    const [today, setToday] = useState<any>(day)
    const [walletByMonth, setWalletByMonth] = useState<WalletMonth | any>([])
    const [month, setMonth] = useState<MonthState | any>([])
    const newArray = new Array(month.length)
    useEffect(() => {
        const array: number[] = generateDate(today.month(), today.year()).map((element:any) => element.$D)
        setMonth(array)
        const getInfo = async () => {
            const response = await getRecordByWallet(name[0], today.$M)
            // let newData: any[] = []
            // let day: any[] = [];
            // let newResponse = [...response]
            // newResponse.forEach((element: any) => {
            //     if(!day.includes(element.dayCreatedObject.day)) {
            //         newData.push({
            //             day: element.dayCreatedObject.day,
            //             category: element.category
            //         })
            //     }
            // })
            // let calendar: any[] = []
            // day.forEach((element: any) => {
            //     response.forEach((element2: any) => {
                    
            //         if(element2.dayCreatedObject.day === element) {

            //         }
            //     });
            // })
            // console.log(newData)
            // console.log(day)
            setWalletByMonth(response)
        }
        getInfo()
        return () => {  }
    }, [name, today])
    // console.log(walletByMonth)
    const series = walletByMonth.map((element: any) => {
        const emptyArray = [...newArray]
        emptyArray[element.dayCreatedObject.day - 1] = element.money
        return { data: emptyArray, label: element.category, stack: 'stack2', valueFormatter(value: number) {
            if(value !== undefined) {
                return `${value}$`
            }
            },
        
        }
    })
    return { series, month, setToday, today, day, setMonth }
}

export { infoHook }