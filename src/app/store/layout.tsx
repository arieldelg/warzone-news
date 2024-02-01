import { Navbar } from "app/components/shared/Navbar/Navbar"
import { getCollections } from "app/services/shopify/collections"


const Layout = async ({ children }: {children: React.ReactNode }) => {
    // const collection = await getCollections()
    
    return (
        <main className=" w-full h-screen flex justify-center py-8">
           <Navbar/>
            <div className="ml-64">
            {/* {
                collection.map((element: any) => {
                    return (
                        <Link href={`/store/${element.handle}`} key={element.id}>
                        <p className="px-4">{element.title}</p>
                        </Link>
                    )
                })
            } */}
            { children }    
            </div>
        </main>
    )
}

export default Layout