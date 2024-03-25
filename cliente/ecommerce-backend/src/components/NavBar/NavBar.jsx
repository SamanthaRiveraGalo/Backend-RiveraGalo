import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget/CartWidget';

//Estilo
import './NavBar.css'

const NavBar = () => {

    return (
        <>
            <Navbar expand="lg" className="navbar navbar-expand-xl navbar-dark bg-dark">
                <Container fluid>
                    <Link to='/' className='brand'>Nike.</Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="conteiner-nav me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavLink to='/' className='category'>Inicio</NavLink>
                            <NavLink to='/category/hombre' className='category'>Hombre</NavLink>
                            <NavLink to='/category/mujer'className='category'>Mujer</NavLink>
                            {/* si es admin */}
                            <NavLink to='/' className='category'>Agregar Productos</NavLink>
                            <NavLink to='/' className='category'>Eliminar Productos</NavLink>
                            {/* si es premium */}
                            <NavLink to='/' className='category'>Agregar Productos</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    <Link to='/cart' className='cart'>
                        <CartWidget />
                    </Link>
                    <Link to='/loggin' className='cart'>
                        Loggin
                    </Link>
                    <Link to='/logout' className='cart'>
                      LogOut
                    </Link>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar