import { env } from "app/config/env"
import { shopifyUrls } from "./urls"

const getProducts = async () => {
    try {
        const response = await fetch(shopifyUrls.products.all, {
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

export  { getProducts }