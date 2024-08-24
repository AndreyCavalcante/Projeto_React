import {FaGithub, FaInstagram, FaLinkedin} from 'react-icons/fa'

import styles from './Footer.module.css'

function Footer(){
    return (
        <footer className={styles.footer}>
            <ul className={styles.lista}>
                <li>
                    <a href="https://www.instagram.com/andrey.cavalcante05/" target="blank"><FaInstagram/></a>
                </li>
                <li>
                    <a href="https://github.com/AndreyCavalcante" target="blank"><FaGithub/></a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/andrey-lopes-cavalcante-mendes-49a523270/" target="blank"><FaLinkedin/></a>
                </li>
            </ul>
            <p className={styles.copy}><span>Costs &copy; 2024</span></p>
        </footer>
    )
}

export default Footer