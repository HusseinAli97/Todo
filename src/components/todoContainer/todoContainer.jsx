import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import Items from '../items/items';
import lightIcon from '../../assets/img/icon-sun.svg';
import darkIcon from '../../assets/img/icon-moon.svg';
import { ToggleModeContext } from '../../context/ToggleMode';

import styles from './todoContainer.module.css';

export default function TodoContainer() {
    const API_URL = 'https://fullstack-todolist-2god.onrender.com/todo';
    const [todos, setTodos] = useState([]);
    const [todoItem, setTodoItem] = useState('');
    const [lastColorIndex, setLastColorIndex] = useState(0);
    const [show, setShow] = useState('all');
    const [filterTodos, setFilterTodos] = useState(todos);
    const { mode, changeMode } = useContext(ToggleModeContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(API_URL);
                setTodos(response?.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const customColors = [
        'linear-gradient(90deg,rgb(7, 66, 108) 0%,rgb(52, 140, 202) 100%)',
        'linear-gradient(90deg,rgba(93, 12, 255, 1) 0%,rgba(155, 0, 250, 1) 100%)',
        'linear-gradient(90deg,rgba(255, 12, 241, 1) 0%,rgba(250, 0, 135, 1) 100%)',
        'linear-gradient(90deg,rgba(20, 159, 255, 1) 0%,rgba(17, 122, 255, 1) 100%)',
        'linear-gradient(90deg,rgba(255, 118, 20, 1) 0%,rgba(255, 84, 17, 1) 100%)',
    ];
    const addTodo = useCallback(async (e) => {
        e.preventDefault();
        if (!todoItem) return;

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * customColors.length);
        } while (randomIndex === lastColorIndex);

        const selectedColor = customColors[randomIndex];
        setLastColorIndex(randomIndex);

        try {
            const response = await axios.post(API_URL, {
                title: todoItem,
                completed: false,
                bgcolor: selectedColor,
            });

            setTodos((prev) => [...prev, response?.data]);
            setTodoItem('');
        } catch (error) {
            console.error(error);
        }
    }, [lastColorIndex, todoItem]);

    const removeTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = [...todos];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTodos(items);
    };


    useEffect(() => {
        if (todos.length > 0) {
            if (show === 'active') {
                setFilterTodos(todos.filter(t => t.completed === false))
            } else if (show === 'completed') {
                setFilterTodos(todos.filter(t => t.completed === true))
            } else if (show === 'all') {
                setFilterTodos(todos)
            }
        }
    }, [show, todos])

    const completeTodo = async (id) => {
        try {
            const todo = todos.find((todo) => todo.id === id);
            await axios.patch(`${API_URL}/${id}`, {
                completed: !todo.completed,
            });
            setTodos((prev) =>
                prev.map((prevTodo) =>
                    prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const clearCompletedTodos = useCallback(async () => {
        try {
            const completedTodoIds = todos
                .filter((todo) => todo.completed)
                .map((todo) => todo.id);

            for (const id of completedTodoIds) {
                await axios.delete(`${API_URL}/${id}`);
            }

            setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
            setShow('all');
        } catch (error) {
            console.error(error);
        }
    }, [todos]);

    return (
        <>
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
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId='todoList' >
                                    {provided => (
                                        <div className={`${styles.todoBody} position-relative shadow-lg todoBody`} ref={provided.innerRef} {...provided.droppableProps}>
                                            {
                                                filterTodos.map((todo, index) => (
                                                    <Items API_URL={API_URL} setTodos={setTodos} key={todo.id} todo={todo} index={index} removeTodos={removeTodo} completeTodo={completeTodo} />
                                                ))
                                            }
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            <div className={`${styles.tabs} tabsFilter`}>
                                <p className={`${styles.count} m-0`}>
                                    item: {filterTodos.length}
                                </p>
                                <Button onClick={() => setShow('all')} className={` navTabs bg-transparent border-0 ${show === 'all' ? 'primary-Color' : ''}`} >All</Button>
                                <Button onClick={() => setShow('active')} className={` navTabs bg-transparent border-0 ${show === 'active' ? 'primary-Color' : ''}  `}>Active</Button>
                                <Button onClick={() => setShow('completed')} className={` navTabs bg-transparent border-0 ${show === 'completed' ? 'primary-Color' : ''}  `}>Completed</Button>
                                <p className={`${styles.count} m-0`} onClick={clearCompletedTodos}>
                                    ClearCompleted
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <small className='text-center text-white-50 position-absolute bottom-0 start-50 translate-middle'>
                    Drag and drop items to reorder
                </small>
            </Container>
        </>

    )
}
