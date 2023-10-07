import { Button, Card, Col, Container, Form, FormCheck, FormLabel, InputGroup, Nav, Row, Tab, Toast } from 'react-bootstrap'
import Items from '../items/items'
import styles from './todoContainer.module.css'
import axios, { all } from 'axios'
import { useContext, useEffect, useState } from 'react'
import lightIcon from '../../assets/img/icon-sun.svg'
import darkIcon from '../../assets/img/icon-moon.svg'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ToggleModeContext } from '../../context/ToggleMode'
export default function TodoContainer() {
    const API_URL = 'http://localhost:3500/todo'
    const [todos, setTodos] = useState([])
    const [todoItem, setTodoItem] = useState('')
    const [lastColorIndex, setLastColorIndex] = useState(0)
    const [show, setShow] = useState('all')
    const { mode, setMode, changeMode } = useContext(ToggleModeContext)
    async function getTodos() {
        let res = await axios.get(API_URL)
        setTodos(res?.data)
    }
    useEffect(() => {
        getTodos()
    }, []);
    const customColors = [
        'linear-gradient(90deg,rgb(7, 66, 108) 0%,rgb(52, 140, 202) 100%)',
        'linear-gradient(90deg,rgba(93, 12, 255, 1) 0%,rgba(155, 0, 250, 1) 100%)',
        'linear-gradient(90deg,rgba(255, 12, 241, 1) 0%,rgba(250, 0, 135, 1) 100%)',
        'linear-gradient(90deg,rgba(20, 159, 255, 1) 0%,rgba(17, 122, 255, 1) 100%)',
        'linear-gradient(90deg,rgba(255, 118, 20, 1) 0%,rgba(255, 84, 17, 1) 100%)',
    ];
    async function addTodo(e) {
        e.preventDefault()
        if (!todoItem) return
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * customColors.length);
        } while (randomIndex === lastColorIndex);

        const selectedColor = customColors[randomIndex];
        setLastColorIndex(randomIndex);
        let res = await axios.post(API_URL, {
            title: todoItem,
            completed: false,
            bgcolor: selectedColor,
        })
        getTodos()
        setTodoItem('')
    }
    async function removeTodos(id) {
        let res = await axios.delete(`${API_URL}/${id}`)
        getTodos()
    }
    function handeDragEnd(result) {
        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTodos(items);
    }
    async function handelShow() {
        let res = await axios.get(API_URL)
        if (show === 'all') {
            setTodos(res?.data)
        } else if (show === 'completed') {
            setTodos(res?.data.filter((todo) => todo.completed))
        } else if (show === 'active') {
            setTodos(res?.data.filter((todo) => !todo.completed))
        } else {
            setTodos(res?.data)
        }
    }
    useEffect(() => {
        handelShow()
    }, [show]);
    async function completeTodo(isCompleted, id) {
        try {
            const updatedTodo = {
                completed: isCompleted,
            };
            const res = await axios.patch(`${API_URL}/${id}`, updatedTodo);
            setTodos((prevTodos) => {
                return prevTodos.map((todo) => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            completed: isCompleted,
                        };
                    }
                    return todo;
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
    async function delCompletedTodos() {
        try {
            const completedTodoIds = todos.filter((todo) => todo.completed).map((todo) => todo.id);
            for (const id of completedTodoIds) {
                await axios.delete(`${API_URL}/${id}`);
            }
            getTodos();
            setShow('all');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container className='' >
            <Row className={`${styles.todoContainer}  m-auto pt-5`}>
                <Col md={12} className='mb-5' >
                    <div className={`${styles.header} d-flex justify-content-between align-items-center mb-3 `}>
                        <h1 className={`${styles.title} title  text-light`}>TODO LIST</h1>
                        <img src={mode === 'light' ? darkIcon : lightIcon} alt="" role='button' className={`${styles.icon} fluid `} onClick={() => {
                            changeMode()
                        }} />
                    </div>
                    <div className={`${styles.addInput} `}>
                        <Form onSubmit={addTodo}>
                            <InputGroup>
                                <Form.Control
                                    placeholder='Enter Your Todo'
                                    value={todoItem}
                                    className={`${styles.addInput}`}
                                    onChange={(e) => setTodoItem(e.target.value)} />
                            </InputGroup>
                        </Form>
                    </div>
                </Col>
                <Col md={12}>
                    <div className="content position-relative">
                        <DragDropContext onDragEnd={handeDragEnd}>
                            <Droppable droppableId='todoList' >
                                {provided => (
                                    <div className={`${styles.todoBody} position-relative shadow-lg todoBody`} ref={provided.innerRef} {...provided.droppableProps}>
                                        {
                                            todos.map((todo, index) => (
                                                <Items API_URL={API_URL} getTodos={getTodos} key={todo.id} todo={todo} index={index} removeTodos={removeTodos} completeTodo={completeTodo} />
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <div className={`${styles.tabs} tabsFilter`}>
                            <p className={`${styles.count} m-0`}>
                                item: {todos.length}
                            </p>
                                    <Button onClick={() => setShow('all')} className={` navTabs bg-transparent border-0 ${show === 'all' ? 'primary-Color' : ''}`} >All</Button>
                                    <Button onClick={() => setShow('active')} className={` navTabs bg-transparent border-0 ${show === 'active' ? 'primary-Color' : ''}  `}>Active</Button>
                                    <Button onClick={() => setShow('completed')} className={` navTabs bg-transparent border-0 ${show === 'completed' ? 'primary-Color' : ''}  `}>Completed</Button>
                            <p className={`${styles.count} m-0`} onClick={delCompletedTodos}>
                                ClearCompleted
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
