'use client'
import { useState } from "react"
import { AddRecord } from "./addRecord"
import { PlusIcon } from '@heroicons/react/24/solid'

const Header = ({ wallet, moneyData }: any) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="mb-4 w-full h-28">
            <div className="flex justify-between items-center px-4 h-full">
                <h1 className="text-4xl font-bold">Registros</h1>
                <div className="bg-teal-500 px-4 py-2 rounded-md text-white text-lg flex gap-2 items-center font-semibold cursor-pointer hover:bg-teal-600" onClick={() => setOpen(prev => !prev)}>
                    <button>Agregar Registro</button>
                    <PlusIcon className="w-8"/>
                </div>
            </div>
            {
                open &&
                    <AddRecord wallet={wallet} setOpen={setOpen} moneyData={moneyData}/>
            }
        </div>
    )
}

export { Header }