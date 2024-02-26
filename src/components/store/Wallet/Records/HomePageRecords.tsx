import { getRecords } from "app/services/MongoDB/actions/getRecords"
import { Record, columns } from "./columns"
import { DataTable } from "./data-table"


const HomePageRecords = async ({moneyData}: any) => {
    const data = await getRecords()
    return(
        <div className="px-4 w-full flex justify-center items-center">
            <DataTable columns={columns} data={data} moneyData={moneyData}/>
        </div>
    )
}

export { HomePageRecords }