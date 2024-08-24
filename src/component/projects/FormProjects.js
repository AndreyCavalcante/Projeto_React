import styles from './FormProjects.module.css'

import {useState, useEffect} from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'

function FormProjects({ btnText, handleSubmit, projectData }){
    const [categorias, setCategorias] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch('http://localhost:5000/categorias', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) =>{
                setCategorias(data)
            })
            .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        console.log(project)
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
        console.log(project)
    }

    function handleCategory(e){
        setProject({...project, categoria: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name: ''}
            />
            <Input
                type="number"
                text="Orçamento do Projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget: ''}
            />
            <Select
                text="Selecione a categoria do projeto"
                name="category_id"
                options={categorias}
                handleOnChange={handleCategory}
                value={project.categoria ? project.categoria.id : ''}
            />
            <Submit text={btnText}/>
        </form>
    )
}

export default FormProjects