import './Footer.scss'
import logo from '../../assets/icons/logo.png'

const Footer = () => {
    return (
        <footer className='footer'>
            <img src={logo} alt='kangaroo' className='footer__logo' />
            <p>© Lendaroo. All Rights Reserved.</p>
        </footer>
    )
}

export default Footer
