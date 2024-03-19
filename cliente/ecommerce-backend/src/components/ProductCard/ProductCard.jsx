import { Link } from "react-router-dom"

export const ProductCard = ({ product }) => {
  return (
    <div className="card w-25">
      <div className="card-body">
        <img src={product.thumbnail} className="card-img-top" alt="producto img" />
        <div>
          <h2>{product.title}</h2>
          <p>$ {product.price}</p>
          <p>Stock: {product.stock}</p>
        </div>
      </div>
      <div className="card-footer">
        <Link to={`/detalle/${product._id}`} className="btn btn-outline-dark">Mas info</Link>
      </div>
    </div>
  )
}
