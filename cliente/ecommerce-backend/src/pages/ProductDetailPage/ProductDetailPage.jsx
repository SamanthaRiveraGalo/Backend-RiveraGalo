import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductDetail from "../../components/ProductDetail/ProductDetail"

const ProductDetailPage = () => {
    const [product, setProduct] = useState({})
    const { pid } = useParams()

    useEffect(() => {
        const getProduct = async () => {
            const dataJson = await fetch(`http://localhost:8080/api/products/${pid}`)
            const data = await dataJson.json()//parseamos
            setProduct(data.payload)
        }
        getProduct()
    }, [])
    return (
        <div>
            <ProductDetail product={product}/>
        </div>
    )
}

export default ProductDetailPage

