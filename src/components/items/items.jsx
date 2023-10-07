import { Button, Form, FormCheck, FormControl } from 'react-bootstrap'
import styles from './items.module.css'
import { Draggable } from 'react-beautiful-dnd'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'
import { useState } from 'react'
import axios from 'axios'
export default function Items({ API_URL,todo, getTodos,index, removeTodos, completeTodo }) {
    const [isedit, setIsEdit] = useState(false)
    const [todoItemUpdate, setTodoItemUpdate] = useState(todo.title)
    async function handelEdit(e) {
        e.preventDefault()        
        setIsEdit(false)
        let res = await axios.patch(`${API_URL}/${todo.id}`, {
            title: todoItemUpdate
        })
        getTodos()
    }
    return (
        <>
            <Draggable key={todo.id} draggableId={todo.id.toString()} index={index} >
                {(provided) => (
                    <div
                        className={`${styles.todoItem} d-flex text-white align-items-center justify-content-between  `}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            ...provided.draggableProps.style,
                            background: todo.bgcolor
                        }}
                    >
                        <FormCheck>
                            <FormCheckInput
                                type='checkbox'
                                checked={todo.completed}
                                onChange={(e) => {
                                    completeTodo(e.target.checked, todo.id)
                                }}
                            />
                            <FormCheckLabel className='fw-bold text-capitalize'>
                                {
                                    isedit ? (
                                        <Form onSubmit={handelEdit}>
                                            <Form.Control type='text'
                                            autoFocus
                                            className={`
                                            ${styles.upInput}`}
                                                value={todoItemUpdate}
                                                onChange={(e) => setTodoItemUpdate(e.target.value)}
                                                onBlur={()=> setIsEdit(false)}
                                            />
                                        </Form>
                                        
                                    ) : (
                                        todo.completed ? <del>{todo.title}</del> : todo.title
                                    )
                                }
                            </FormCheckLabel>
                        </FormCheck>
                        <div className={`d-flex align-items-center justify-content-between`}>
                            <Button size='sm' variant='outline-light' onClick={() => removeTodos(todo.id)} className={`${styles.xButton} rounded-circle me-3`}>
                                <i className='fas fa-lg fa-xmark'></i>
                            </Button>
                            <Button size='sm' variant='outline-light' onClick={() => {
                                setIsEdit(true)
                            }} className={`${styles.xButton} rounded-circle `} >
                                <i className='fas fa-lg fa-edit'></i>
                            </Button>
                        </div>
                    </div>
                )}
            </Draggable>
        </>
    )
}
