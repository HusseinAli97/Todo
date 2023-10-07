import { Button, Card, Col, Container, Form, FormCheck, InputGroup, Row } from 'react-bootstrap'
import Items from '../items/items'
import styles from './todoContainer.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import lightIcon from '../../assets/img/icon-sun.svg'
import darkIcon from '../../assets/img/icon-moon.svg'
export default function TodoContainer() {
    const API_URL = 'http://localhost:3500/todo'
    const [todos, setTodos] = useState([])
    const [todoItem, setTodoItem] = useState('')

    async function getTodos() {
        let res = await axios.get(API_URL)
        setTodos(res?.data)
    }
    useEffect(() => {
        getTodos()
    }, []);
    async function addTodo(e) {
        e.preventDefault()
        if (!todoItem) return
        let res = await axios.post(API_URL, { title: todoItem, completed: false })
        getTodos()
        setTodoItem('')
        console.log(todoItem);
    }
    async function removeTodos(id) {
        let res = await axios.delete(`${API_URL}/${id}`)
        getTodos()
    }
    return (
        <Container className='' >
            <Row className={`${styles.todoContainer}  m-auto pt-5`}>
                <Col md={12} className='mb-5' >
                    <div className={`${styles.header} d-flex justify-content-between align-items-center mb-3 `}>
                        <h1 className={`${styles.title} text-light`}>TODO LIST</h1>
                        <img src={lightIcon} alt="" className={`${styles.icon} fluid`} />
                    </div>
                    <div className={`${styles.addInput} `}>
                        <Form onSubmit={addTodo}>
                            <InputGroup>
                                <Form.Control
                                    placeholder='Add Todo'
                                    value={todoItem}
                                    className={`${styles.addInput}`}
                                    onChange={(e) => setTodoItem(e.target.value)} />
                            </InputGroup>
                        </Form>
                    </div>
                </Col>
                <Col md={12}>
                    <div className={`${styles.todoBody} `}>
                    <Items />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
