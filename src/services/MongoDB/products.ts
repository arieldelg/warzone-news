import { Mongo_Url } from "./urls"
import { env } from "app/config/env"

const data = {
    "collection":"listingsAndReviews",
    "database":"sample_airbnb",
    "dataSource":"Cluster0",
    "projection": {}
}

const getProductsMDB = async () => {
    try {
        const response = await fetch(Mongo_Url.products.product2test, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'apiKey': env.MONGO_DB_PRODUCTS_API_KEY as string
            },
            body: JSON.stringify(data)
        })
        const { document } = await response.json()
        return document
    } catch (error) {
        console.log(error)
    }
}


export { getProductsMDB }