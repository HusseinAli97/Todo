# Frontend Mentor - Todo app solution

This is a solution to
the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend
Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Todo app solution](#frontend-mentor---todo-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![todolist output.png](./src/assets/img/Demo.png)


### Links

- Solution URL: [Github Repo](https://github.com/HusseinAli97/Todo)
- Live Site URL: [Deployed on Railway](https://todolist-743d.onrender.com/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- axios
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [BootStrap](https://getbootstrap.com) - For styles
- Used JSON server package during development to allow full CRUD
- Did some edits with the api and server js file for deployment (from json server to Nodejs)

### What I learned

I have learned to implement drag and drop using (react beautiful dnd package):

```js
const todos = ["A", "B", "C", "D", "E"];

// React state to track order of items
    const [todoItemUpdate, setTodoItemUpdate] = useState(todo.title)
```

```js
// Function to update list on drop
    function handeDragEnd(result) {
        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTodos(items);
    }
```

```js
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
```

### Continued development

- Next I will add authentication for users and each user will have his own todo list after updating the backend .

### Useful resources

- [Simple Drag and Drop List in React JS](https://www.youtube.com/watch?v=aYZRRyukuIw&t=311s&ab_channel=ColbyFayock) - This helped me to implement the drag and drop section. I really liked this pattern and will
  use it going forward.
- [VSCode Extension (Color Highlight)](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight) - This is an amazing tool which helped me to check for colors in the style-guide.md file before using them.
- [How to Deploy reactjs with JSON server](https://dev.to/yongchanghe/deploy-react-app-with-json-server-on-heroku-59ak) - This is a very useful article that helped me with editing my json server code with some nodejs to deploy it within the react project. I'd recommend it to anyone still learning this concept.

## Author

- Hussein Mohammad ALi
- Frontend Mentor - [@HusseinALi](https://www.frontendmentor.io/profile/HusseinAli97)

## Acknowledgments

Thanks to Dave Gray tutorials they helped me understand  the basics of the project.
