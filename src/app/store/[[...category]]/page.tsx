import { ProductsWrapper } from "app/components/store/ProductWrapper/ProductWrapper"
import { getProducts } from "app/services/shopify/products"
import { HomeHeader } from "app/components/store/Header/HomeHeader"
import { getCollections, getCollectionsById } from "app/services/shopify/collections"
import { BanknotesIcon } from '@heroicons/react/24/outline'
import { getUsers } from "app/services/MongoDB/users_db"
import { getProductsMDB } from "app/services/MongoDB/products"
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from "next/link"
import { getServerSession } from "next-auth"
import authOptions from "app/app/api/auth/[...nextauth]/options"

interface Url {
    params : {
        category: string[],
    },
    searchParams?: string
}

const category = async (props: Url) => {
    // const { se} = await getServerSession(authOptions)
    // console.log(data)
    const { category } = props.params 
    let products = []
    const collection = await getCollections()
    if(category?.length > 0) {
        const collectionId = collection.find((element: any) => element.handle === category[0]).id
        products = await getCollectionsById(collectionId)
    } else {
        products = await getProducts()
    }
    // const data = await getUsers()
    // const data2 = await getProductsMDB()
    // console.log(data2)
    return (
        <main>
            <h1 className="text-4xl font-bold w-full">Cuenta Principal</h1>
            <div className="flex gap-5">
                <div className=" w-max flex gap-2 bg-cyan-500 px-4 py-2 rounded-xl text-white shadow-4xl my-4 hover:scale-105 transition duration-300 cursor-pointer">
                    <BanknotesIcon className="w-8"/>
                    <div>
                        <p>Efectivo Disponible</p>
                        <div className="flex flex-row gap-2">
                            <p>$ 2500.00</p>
                            <p>MXN</p>
                        </div>
                    </div>
                </div>
                <div className=" w-max flex px-4 py-2 border border-dashed border-cyan-500 rounded-xl text-cyan-500 my-4 hover:scale-105 transition duration-300 cursor-pointer">
                    <Link href={'/new-wallet'} className="flex items-center gap-2">
                        <p className="font-semibold">Agregar Cuenta</p>
                        <PlusCircleIcon className="w-6"/>
                    </Link>
                </div>
            </div>
            <HomeHeader/>
            <ProductsWrapper products={products}/>
        </main>
                
    )
}

export default category