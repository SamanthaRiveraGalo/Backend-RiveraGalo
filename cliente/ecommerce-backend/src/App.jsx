import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductsPage } from '././pages/ProductsPage/ProductsPage'
import ProductDetailPage from '././pages/ProductDetailPage/ProductDetailPage'
import NavBar from './components/NavBar/NavBar'
import { Footer } from './components/Footer/Footer'

// estilos
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/detalle/:pid' element={<ProductDetailPage />} />
        {/* category-hombre-mujer */}
        {/* <Route path='/cart' element={<CartConteiner />} />
        <Route path='/detalleCompra/:id' element={<DetalleCompra/>} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
