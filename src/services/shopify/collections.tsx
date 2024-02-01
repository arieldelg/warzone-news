import { shopifyUrls } from "./urls"
import { env } from "process"


const getCollections = async () => {
    try {
        const response = await fetch(shopifyUrls.collections.all, {
            headers: new Headers({
                'X-Shopify-Access-Token' : env.SHOPIFY_API_KEY || ""
            })
        })

            const { smart_collections }= await response.json()
            const transformedCollection = smart_collections.map((element: any) => {
                return {
                    id: element.id,
                    handle: element.handle,
                    title: element.title
                }
            }) 
            return transformedCollection
    } catch (error) {
        console.log(error)
    }
}

const getCollectionsById = async (id: string) => {
    try {
        const response = await fetch(shopifyUrls.collections.products(id), {
            headers: new Headers({
                'X-Shopify-Access-Token' : env.SHOPIFY_API_KEY || ""
            })
        })

            const { products } = await response.json()
            return products
    } catch (error) {
        console.log(error)
    }
}

export { getCollections, getCollectionsById }