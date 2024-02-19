'use client'
import { BarChart } from '@mui/x-charts/BarChart'
import { useState } from 'react'
import { infoHook } from './infoHook'
import { nameMonths } from 'app/util/calendar'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import dayjs from 'dayjs'


const BarChartAccounts = ({wallet, name}: any) => {
    
    const { series, month, today, setToday, day, setMonth } = infoHook(name)

    return(
        <div className="w-[700px] my-8">
            <div className='flex justify-between items-center px-8'>
                <h1 className='text-xl'>{nameMonths[today.month()]} {today.year()}</h1>
                <div className='flex items-center gap-2'>
                    <ChevronLeftIcon 
                    className='w-6 cursor-pointer'
                    onClick={() => {
                        setToday(today.month(today.month() - 1))
                        
                    }}
                    />
                    <p className='text-xl cursor-pointer' onClick={() => setToday(day)}>Today</p>
                    <ChevronRightIcon 
                    className='w-6 cursor-pointer'
                    onClick={() => setToday(today.month(today.month() + 1))}
                    />
                </div>
            </div>
            <BarChart 
            xAxis={[{ scaleType: 'band', data
            : month}]}
            series={series}
            width={700}
            height={500}
            />
        </div>
    )
}

export { BarChartAccounts }