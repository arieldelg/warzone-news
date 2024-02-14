'use client'
import { ChartContainer } from '@mui/x-charts/ChartContainer'
import { BarChart } from '@mui/x-charts/BarChart'
import { generateDate } from 'app/util/calendar'
import { useEffect, useState } from 'react'
import { getRecordByWallet } from 'app/services/MongoDB/actions/getRecordByWallet'
import { infoHook } from './infoHook'
// import { Bar } from "react-chartjs-2"
// import {
//     Chart,
//     BarElement,
//     CategoryScale,
//     LinearScale,
//     Tooltip,
//     Legend
// } from 'chart.js'

// Chart.register(
//     BarElement,
//     CategoryScale,
//     LinearScale,
//     Tooltip,
//     Legend
// );


// console.log(new Array(30))
type MonthState = {
    month: number[],
    setMonth: React.Dispatch<React.SetStateAction<number[]>>
}

const BarChartAccounts = ({wallet, name}: any) => {
    const { number, walletByMonth, walletName } = infoHook(wallet, name)
    const [month, setMonth] = useState<MonthState | any>([])
    useEffect(() => {
        
        
        const array: number[] = generateDate().map((element:any) => element.$D)
        setMonth(array)
        return () => {}
    }, [name])
    return(
        <div className="w-[700px]">
            {/* <BarChart 
            dataset={combinedArrays}
            xAxis={[{ scaleType: 'band', data: month}]}
            series={[
                {dataKey: }
            ]}
            width={700}
            height={500}
            /> */}
        </div>
    )
}

export { BarChartAccounts }