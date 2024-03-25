import { Link } from "react-router-dom"

import './ProductDetail.css'

function ProductDetail({ product }) {

    return (
        <>
            <div className="conteiner-detail">

                <div className="detail">

                    <div className="detail-img">
                        <img className="w-75" src={product.thumbnail} alt="imagen producto" />
                    </div>

                    <div className="conteiner-detalle">

                        <h1 className="producto-nombre"> {product.title} </h1>
                        <p className="producto-precio"> $ {product.price} </p>
                        <p className="producto-detalle">{product.description}</p>

                        <div className="conteiner-tabla-talle">
                            <div>
                                <p className="titutlo-talle">Tabla de talles</p>
                            </div>
                            <div className="conteiner-talla">
                                <div className="talle-linea">
                                    <div className="talla">
                                        <span>7</span>
                                    </div>
                                    <div className="talla">
                                        <span>7.5</span>
                                    </div>
                                    <div className="talla">
                                        <span>8</span>
                                    </div>
                                    <div className="talla">
                                        <span>8.5</span>
                                    </div>
                                </div>

                                <div className="talle-linea">
                                    <div className="talla">
                                        <span>9</span>
                                    </div>
                                    <div className="talla">
                                        <span>9.5</span>
                                    </div>
                                    <div className="talla">
                                        <span>10</span>
                                    </div>
                                    <div className="talla">
                                        <span>10.5</span>
                                    </div>
                                </div>

                                <div className="talle-linea">
                                    <div className="talla">
                                        <span>11</span>
                                    </div>
                                    <div className="talla">
                                        <span>11.5</span>
                                    </div>
                                    <div className="talla">
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <p class="btn btn-outline-dark">Agregar al carrito</p>

                    </div>

                </div>

            </div>
        </>
    )

}

export default ProductDetail
