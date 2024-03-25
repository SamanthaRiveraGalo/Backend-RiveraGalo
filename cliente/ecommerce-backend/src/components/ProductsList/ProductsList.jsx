import { ProductCard } from "../ProductCard/ProductCard"

export const ProductsList = ({products}) => {
  return (
    <>
        {products.map(product => <ProductCard key={product._id} product={product} />)}
    </>
  )
}
