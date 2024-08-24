import styles from '../projects/ProjectCard.module.css'

import {BsFillTrashFill} from 'react-icons/bs'

function ServiceCard({ id, name, cost, description, handleRemove }){

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo Total:</span> R${cost}
            </p>
            <p>{description}</p>
            <div className={styles.card_actions}>
                <button className={styles.btn} onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard