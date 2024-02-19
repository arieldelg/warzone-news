import { Header } from "app/components/store/Wallet/Records/Header"
import { HomePageRecords } from "app/components/store/Wallet/Records/HomePageRecords"
import { getDataDB } from "app/services/MongoDB/actions/getDataDB"


const Records = async() => {
    const data = await getDataDB()
    const wallet = data.map((element: any) => element.nombre_cuenta)
    const moneyData = data.map((element: any) => {
        return {
            proyecto: element.nombre_cuenta,
            money: element.money,
            _id: element._id
        }
    })
    return(
        <div className="w-full h-full relative">
            <Header wallet={wallet} moneyData={moneyData}/>
            <HomePageRecords moneyData={moneyData}/>
        </div>
    )
}

export default Records