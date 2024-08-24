import {Link} from 'react-router-dom'

import styles from './NavBar.module.css'

import Container from './Container'
import Logo from '../imgs/costs_logo.png'

function NavBar(){
    return (
        <nav className={styles.navbar}>
            <Container>
                <div>
                    <Link to="/">
                        <img className={styles.logo} src={Logo} alt="Logo Costs" />
                    </Link>
                </div>
                <div>
                    <ul className={styles.lista}>
                        <li className={styles.item}><Link to="/">Home</Link></li>
                        <li className={styles.item}><Link to="/Projects">Projetos</Link></li>
                        <li className={styles.item}><Link to="/Contact">Contato</Link></li>
                        <li className={styles.item}><Link to="/Company">Empresa</Link></li>
                    </ul>
                </div>
            </Container>
        </nav>
    )
}

export default NavBar