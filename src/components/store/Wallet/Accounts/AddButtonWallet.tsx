'use client'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { CardAddWallet } from './CardAddWallet'
import { useState } from 'react'


const AddButtonWallet = ({ addOptimisticWallet, session}: any) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    return (
        <>
            <div 
            className=" w-50 h-20 flex px-4 py-2 border border-dashed border-cyan-500 rounded-xl text-cyan-500 my-4 hover:scale-105 transition duration-300 cursor-pointer justify-center items-center gap-2"
            onClick={() => {
                if(session === null) {
                    router.replace('/login')
                } else {
                    setOpen(true)
                }
            }}
            >
                <p className=" text-base font-semibold">Agregar Cuenta</p>
                <PlusCircleIcon className="w-6"/>
            </div>
            {
                open &&
                <CardAddWallet 
                addOptimisticWallet={addOptimisticWallet} 
                setOpen={setOpen} 
                />
            
            }
        </>
    )
}

export { AddButtonWallet }