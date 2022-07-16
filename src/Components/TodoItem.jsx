import React , {useState}from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormTodo from './FormTodo';


const TodoItem = ({ todos, dispatch }) => {
    const [item , setItem] = useState(null)

    const completed = id => {
        let updateTodo = todos.map(todo =>{
            if(todo.id === id){
                todo.complete = !todo.complete
            }
            return todo
        })
        dispatch({type : 'updateTodo' , payload : updateTodo})
    }
    const remove = id => {
        let updateTodos = todos.filter( todo => todo.id !== id)
        dispatch({type : 'updateTodo' , payload : updateTodos})
    }

    const edit = (id , newValue) => {
        let editTodo = todos.map(todo => todo.id === id ? newValue : todo)
        dispatch({type : 'updateTodo' , payload : editTodo})
        setItem(null)
    }

    if(item){
        return <FormTodo onSubmit={edit} todo={item}/>
    }
    return todos.map(todo => (
        <div className={todo.complete ? 'todo-item complete' : 'todo-item'} key={todo.id}>
            <div className='todo-text' onClick={() => completed(todo.id)}>
            <h2>{todo.text}</h2>
            </div>
            <div className="icons">
                <button className="delete-icon" onClick={() => remove(todo.id)}>
                    <DeleteIcon />
                </button>
                <button className="edit-icon" onClick={() => setItem(todo)}>
                    <EditIcon />
                </button>
            </div>
        </div>
    ))
}

export default TodoItem