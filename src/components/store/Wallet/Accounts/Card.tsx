'use client'
import { BanknotesIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { updateSelectedWallet } from 'app/services/MongoDB/actions/updateSelectedWallet'

const Card = ({ data, wallet }: any ) => {
    return (
        <>
            <div 
            className={`w-48 h-20 min-w-64 ${ data.isActive  ? 'bg-cyan-500' : 'bg-slate-500'} px-2 py-2 my-2 rounded-xl text-white shadow-2xl hover:scale-105 transition duration-300 cursor-pointer flex justify-between items-center`}
            onClick={async() => {
                await updateSelectedWallet(data.nombre_cuenta, wallet)
            }}
            >
                <div className='flex gap-2'>
                    <BanknotesIcon className="w-8"/>
                    <div>
                        <p className='text-md pb-1'>{data.tipo_cuenta}</p>
                        <div className="flex flex-row gap-2">
                            <p>${data.money}</p>
                            <p>{[data.tipo_moneda]}</p>
                        </div>
                    </div>
                </div>
                <XCircleIcon className='w-8 hover:text-red-600' onClick={() => console.log('hola')}/>
            </div>
        </>
    )
}

export { Card }