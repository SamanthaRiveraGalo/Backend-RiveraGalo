import { useEffect, useState } from "react"
import { ProductsList } from "../../components/ProductsList/ProductsList"

import './ProductsPage.css'

export const ProductsPage = () => {
    //manejo de estados o llamada a la api
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const dataJson = await fetch('http://localhost:8080/api/products')
            const data = await dataJson.json()//parseamos
            setProducts(data.payload.payload)//me faltaba un payload
            console.log(data.payload.payload)
        }
        getProducts()
    }, [])

    return (
        <div>
            <div className="row conteiner-products">
                <ProductsList products={products} />
            </div>
        </div>
    )
}