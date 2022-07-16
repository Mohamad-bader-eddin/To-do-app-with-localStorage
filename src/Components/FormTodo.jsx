import React, { useState, useEffect, useRef } from 'react'

const FormTodo = ({ onSubmit, todo }) => {
    const [input, setInput] = useState(todo ? todo.text : '')
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!input || /^\s*$/.test(input)) {
            return
        }
        if (todo) {
            onSubmit(todo.id, { id: todo.id, text: input, complete: todo.complete })
        } else {
            onSubmit({
                type: 'addTodo', payload: {
                    id: Date.now(),
                    text: input,
                    complete: false
                }
            })
        }
        setInput('')
    }
    return (
        <div className='todo-form'>
            <form onSubmit={handleSubmit}>
                {
                    todo ?
                        (<>
                            <input type="text" className='todo-input update'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                ref={inputRef}
                                placeholder ='Update Task' />
                            <button className='update' type='submit'>Update</button>
                        </>)
                        :
                        (<>
                            <input type="text" className='todo-input'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                ref={inputRef} 
                                placeholder = 'Add New Task'/>
                            <button type='submit'>Add Task</button></>)
                }
            </form>
        </div>
    )
}

export default FormTodo