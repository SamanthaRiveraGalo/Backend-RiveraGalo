import React from 'react'
//estilo
import './Footer.css'

export const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-body'>
                <figure>
                    <img src="/assets/nike-jordan.svg" alt="imagen logo" />
                </figure>

                <div className='footer-ayuda'>
                    <p className='footer-title-ayuda'>Ayuda</p>
                    <p>Envios y entregas</p>
                    <p>Devoluciones</p>
                    <p>Cambios</p>
                    <p>Autogestionar mi devolucion</p>
                    <p>Opciones de pago</p>
                    <p>Contactate</p>
                </div>
                <div className='footer-acerca'>
                    <p className='footer-title-acerca'>Acerca de Nike</p>
                    <p>Noticias</p>
                    <p>Inversinistas</p>
                    <p>Sustentabilidad</p>
                </div>
                <div className='footer-redes'>
                    <p className='footer-title-redes'>Redes Sociales</p>
                    <p>Instagram</p>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Youtube</p>
                </div>
            </div>
            <div className='footer-pie'>
                <div className='footer-ubicacion'>
                    <p>Argentina</p>
                </div>
                <div className='footer-terminos'>Terminos y condiciones</div>
            </div>

        </div>
    )
}