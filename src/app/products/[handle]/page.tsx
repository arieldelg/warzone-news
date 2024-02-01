


import { useSearchParams } from "next/navigation"

const ProductPageParam = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    console.log(id)
    return (
        <h1>Page params</h1>
    )
}

export default ProductPageParam