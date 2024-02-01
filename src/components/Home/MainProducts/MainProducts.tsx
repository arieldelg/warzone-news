import Image from "next/image"
import { getProducts } from "app/services/shopify/products"


const MainProducts = async () => {
    const response = await fetch('http://localhost:3000/api')
    const { products } = await response.json()
    
    console.log(products)
    return (
        <div>
            <h1>MainProducts</h1>
            <div>
                {products?.map(element => {
                    const imagen = element.images[0]
                    return (
                        <article key={element.id}>
                            <Image key={element.id} src={imagen} alt={element.title}/>
                            <p>{element.title}</p>
                        </article>
                    
                    )
                })}
            </div>
        </div>
    )
}

export { MainProducts }