'use client'
import { AddButtonWallet } from "./AddButtonWallet"
import { Card } from "./Card"
import { useOptimistic } from "react"

export type Data = {
    _id: string
    money: string
    tipo_cuenta: string
    tipo_moneda: string
    user_id: string
}

const WrappedCard = ({wallet}: any) => {
    const [optimistic, addOptimisticWallet] = useOptimistic(wallet, (state, addWallet) => {
        return[...state, addWallet]
    })
    
    return (
        <>
        {
            optimistic.length === 0 && 
            wallet.map((element: Data) => {
            return <Card data={element} key={element._id} wallet={wallet}/>
            })
        }
        {
            optimistic.length > 0 && 
            optimistic.map((element: any) => {
            return <Card data={element} key={element._id} wallet={wallet} />
            })
        }
        <AddButtonWallet wallet={wallet} addOptimisticWallet={addOptimisticWallet}/>
        </>
    )
}

export { WrappedCard }