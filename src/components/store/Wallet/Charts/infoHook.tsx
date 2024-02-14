'use client'
import { getRecordByWallet } from "app/services/MongoDB/actions/getRecordByWallet"
import { useEffect, useState } from "react"

type WalletMonth = {
    month: object[],
    setMonth: React.Dispatch<React.SetStateAction<object[]>>
}

const infoHook = (wallet: any, name: string[]) => {
    const [walletByMonth, setWalletByMonth] = useState<WalletMonth | any>([])
    const walletName = wallet.filter((element:any) => element.nombre_cuenta === name[0])
    const number = Number(walletName[0].money)
    useEffect(() => {
        const getInfo = async () => {
            const response = await getRecordByWallet(name[0])
            setWalletByMonth(response)
        }
        getInfo()
        return () => {  }
    }, [name])
    const dataSet = {
        Nomina: 
    }
    console.log(number, walletByMonth, walletName)
    return { number, walletName, walletByMonth }
}

export { infoHook }