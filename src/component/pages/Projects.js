import { useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'

import Message from '../layout/Message'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import Loading from '../layout/Loading'

import ProjectCard from '../projects/ProjectCard'

import styles from './Projects.module.css'

function Projects(){

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState((''))

    useEffect(() => {

        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))

    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(projects.filter((project) => project.id !== id));
            setProjectMessage('Projeto excluído com sucesso!')
        })
        .catch((err) => console.log(err));
    }

    return (
       <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/NewProject" text="Novo projeto"/>
            </div>

            {message && <Message  msg={message} type="success"/>}
            {projectMessage && <Message  msg={projectMessage} type="success"/>}

            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            title={project.name}
                            budget={project.budget}
                            category={project.categoria.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))
                }
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 && (
                    <h2>Não há projetos cadastrados!</h2>
                )}
            </Container>
       </div>
    )
}

export default Projects