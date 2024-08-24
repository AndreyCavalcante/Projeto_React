import { useState, useEffect } from 'react'

import { parse, v4 as uuidv4} from 'uuid'

import { useParams } from 'react-router-dom'

import styles from './Project.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'

import FormProjects from '../projects/FormProjects'

import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project(){

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectFrom] = useState(false)
    const [message, setMessage] = useState((''))
    const [typeMessage, setTypeMessage] = useState((''))
    const [showServiceForm, setShowServiceForm] = useState(false)

    useEffect(() => {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
                console.log(project)
            })
            .catch((err) => console.log(err))

    }, [])

    function EditarProjeto(projeto){

        setMessage('')

        if(projeto.budget < projeto.cost){
            setTypeMessage('error')
            setMessage('O custo está ultrapaçando o orçamento')
        }else{
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projeto),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setTypeMessage('success')
                    setMessage('Projeto atualizado com sucesso!')
                })
                .catch((err) => console.log(err))
        }

    }

    function createService(project){

        setMessage('')

        const lastService = project.services[project.services.length -1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)){
            setTypeMessage('error')
            setMessage('Custo do projeto ultrapassou o orçamento')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setTypeMessage('success')
                setMessage("Serviço adicionado com sucesso!")
                setShowServiceForm(false)
            })
            .catch((err) => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectFrom(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function removeService(id, cost){

        setMessage('')

        const servicesUpdate = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdate = project

        projectUpdate.services = servicesUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdate),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
                setTypeMessage('success')
                setMessage('Serviço removido com sucesso!')
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        <div className={styles.details_container}>
                            {message && <Message  msg={message} type={typeMessage}/>}
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? "Editar Projeto" : "Fechar"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.categoria.name}
                                    </p>
                                    <p>
                                        <span>Total Orçamentado:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <FormProjects handleSubmit={EditarProjeto} btnText="Atualizar" projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {
                                    showServiceForm && (
                                        <ServiceForm 
                                            btnText="Adicionar"
                                            handleSubmit={createService}
                                            projectData={project}
                                        
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 && 
                                services.map((service) => (
                                    <ServiceCard 
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {services.length === 0 && (
                                    <p>Não Há serviços cadastrados nesse projeto</p>
                                 )

                            }
                        </Container>
                    </Container>
                </div>
            ): (
                <Loading />
            )}
        </>
    )

}

export default Project