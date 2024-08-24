import styles from './NewProjects.module.css'
import FomrProject from '../projects/FormProjects'

import { useNavigate } from 'react-router-dom'

function NewProject(){

    const navigate = useNavigate()

    function createPost(project){
        
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                navigate("/Projects", {state: { message: "Projeto criado com sucesso!" }});
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crei seu projeto para depois adicionar os serviços</p>
            <FomrProject handleSubmit={createPost} btnText="Criar Projeto!"/>
        </div>
    )
}

export default NewProject