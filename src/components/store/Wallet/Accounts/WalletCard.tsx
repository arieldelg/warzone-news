import Link from "next/link"
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { WrappedCard } from "./WrappedCard"
import { getDataDB } from "app/services/MongoDB/actions/getDataDB"
import { BarChartAccounts } from "../Charts/BarChart"

const WalletCard = async  () => {
    const wallet: any = await getDataDB()
    const filter = wallet.filter((element: any) => element.isActive === true)
    const name = filter.map((element: any) => element.nombre_cuenta)
    return (
        <>
            <h1 className="text-4xl font-bold w-full">{name[0]}</h1>
            <div className="flex flex-wrap gap-x-4 py-4 items-center">
                <WrappedCard wallet={wallet}/>
                <div className="w-full">
                    <BarChartAccounts wallet={wallet} name={name}/>
                </div>
            </div>
        </>
    )
}

export { WalletCard }