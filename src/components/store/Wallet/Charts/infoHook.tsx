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
            setWalletByMonth(response)
        }
        getInfo()
        return () => {  }
    }, [name, today])
    const series = walletByMonth.map((element: any) => {
        const emptyArray = [...newArray]
        emptyArray[element.dayCreatedObject.day - 1] = element.money
        return { data: emptyArray, label: element.name, stack: 'stack2', valueFormatter(value: number) {
            if(value !== undefined) {
                return `${value}$`
            }
            }
        }
    })
    // const todayWallet = walletName.concat(walletByMonth)
    // const datasetArray = todayWallet.map((element: any) => {
        //     return { data: element.name, stack: 'A'}
        // })
       
    return { series, month, setToday, today, day, setMonth }
}

export { infoHook }