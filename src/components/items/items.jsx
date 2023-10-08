import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Button, Form, FormCheck } from 'react-bootstrap';
import styles from './items.module.css';
import { Draggable } from 'react-beautiful-dnd';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
export default function Items({
    API_URL,
    todo,
    setTodos,
    index,
    removeTodos,
    completeTodo,
    setFilterTodos,
}) {
    const [isEdit, setIsEdit] = useState(false);
    const [todoItemUpdate, setTodoItemUpdate] = useState(todo.title);
    const [updating, setUpdating] = useState(false);

    const handleComplete = async () => {
        setIsEdit(false); // Disable editing immediately
        setUpdating(true); // Indicate updating
        try {
            const res = await axios.patch(`${API_URL}/${todo.id}`, {
                title: todoItemUpdate,
                completed: !todo.completed, // Toggle completed state in the request
            });
            setTodos((prev) =>
                prev.map((prevTodo) =>
                    prevTodo.id === res.data.id ? res.data : prevTodo
                )
            );
            setFilterTodos((prev) =>
                prev.map((prevTodo) =>
                    prevTodo.id === res.data.id ? res.data : prevTodo
                )
            );
        } catch (error) {
            console.error(error);
        } finally {
            setUpdating(false);
        }
    };
    const handelEdit = 
        async (e) => {
            e.preventDefault();
            setIsEdit(false);
            try {
                const res = await axios.patch(`${API_URL}/${todo.id}`, {
                    title: todoItemUpdate,
                });
                setTodos((prev) =>
                    prev.map((prevTodo) =>
                        prevTodo.id === res.data.id ? res.data : prevTodo
                    )
                );
                setFilterTodos((prev) =>
                    prev.map((prevTodo) =>
                        prevTodo.id === res.data.id ? res.data : prevTodo
                    )
                );
            } catch (error) {
                console.error(error);
            }
        };

    return (
        <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
            {(provided) => (
                <div
                    className={`${styles.todoItem} todoItem d-flex text-white align-items-center justify-content-between `}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        background: todo.bgcolor,
                    }}
                >
                    <FormCheck>
                        <FormCheckInput
                            type='checkbox'
                            checked={todo.completed}
                            onChange={handleComplete}
                            disabled={updating} // Disable checkbox during update
                        />
                        <FormCheckLabel className='fw-bold text-capitalize'>
                            {isEdit ? (
                                <Form onSubmit={handelEdit}>
                                    <Form.Control
                                        type='text'
                                        autoFocus
                                        className={`${styles.upInput}`}
                                        value={todoItemUpdate}
                                        onChange={(e) => setTodoItemUpdate(e.target.value)}
                                        onBlur={() => setIsEdit(false)}
                                    />
                                </Form>
                            ) : todo.completed ? (
                                <del>{todo.title}</del>
                            ) : (
                                todo.title
                            )}
                        </FormCheckLabel>
                    </FormCheck>
                    <div className={`d-flex align-items-center justify-content-between`}>
                        <Button
                            size='sm'
                            variant='outline-light'
                            onClick={() => removeTodos(todo.id)}
                            className={`${styles.xButton} rounded-circle me-3`}
                        >
                            <i className='fas fa-lg fa-xmark'></i>
                        </Button>
                        <Button
                            size='sm'
                            variant='outline-light'
                            onClick={() => {
                                setIsEdit(true);
                            }}
                            className={`${styles.xButton} rounded-circle `}
                        >
                            <i className='fas fa-lg fa-edit'></i>
                        </Button>
                    </div>
                </div>
            )}
        </Draggable>
    );
}