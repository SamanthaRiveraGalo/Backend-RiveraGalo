import { Link } from "react-router-dom"

function ProductDetail({ product }) {
    return (
        <div>
            <div>
                <img src={product.thumbnail} alt="imagen producto" />
            </div>
            <div>
                <h2>{product.title}</h2>
                <p>Precio: $ {product.price}</p>
                <p>{product.description}</p>
                <Link>Comprar</Link>
            </div>
        </div>
    )
}

export default ProductDetail
