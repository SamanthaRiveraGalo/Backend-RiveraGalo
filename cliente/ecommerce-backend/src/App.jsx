import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductsPage } from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'

import 'bootstrap/dist/css/bootstrap.min.css'


function App() {

  return (
    <BrowserRouter>
      <h1>Ecommerce</h1>
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/detalle/:pid' element={<ProductDetailPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
