import React, { useReducer ,useEffect } from 'react'
import FormTodo from './FormTodo'
import TodoItem from './TodoItem'

const initialState = []
const reducer = (state, action) => {
    switch (action.type) {
        case 'addTodo':
            return [...state, action.payload]

        case 'updateTodo':
            return [...action.payload]
        default:
            return state
    }
}

const Todos = () => {
    const [todos, dispatch] = useReducer(reducer, initialState)
    const completeTask = todos.filter(todo => todo.complete)
    useEffect(()=>{
        if(localStorage.getItem('tasks')){
            let data = localStorage.getItem('tasks')
            if(data){
                dispatch({type : 'updateTodo' , payload : JSON.parse(localStorage.getItem('tasks'))})
            }
        }
    },[])
    useEffect(()=>{
        localStorage.setItem('tasks' , JSON.stringify(todos))
    },[todos])
    console.log(todos)
    return (
        <>
            <div className='container'>
                <h1 className='title'>What's the plan for today</h1>
                <FormTodo onSubmit={dispatch} />
                <TodoItem todos={todos} dispatch={dispatch} />
            </div>
            <div className="task-stats">
                <div className="tasks-count">
                    Tasks <span>{todos.length}</span>
                </div>
                <div className="task-completed">
                    Completed <span>{completeTask.length}</span>
                </div>
            </div>
        </>
    )
}

export default Todos