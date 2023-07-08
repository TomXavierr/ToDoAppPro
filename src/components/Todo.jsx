
import React,{useState, useRef, useEffect } from 'react';



const Todo = () => {

    const[toDo , setTodo] = useState('');
    const[toDos, setTodos] = useState([]);
    const[editId, setEditId] = useState(0);


    const handleSubmit = (e) =>{
        e.preventDefault();
    }

    const addTodo =() => {
        if(toDo !== ''){
            setTodos([...toDos,{task: toDo, id: Date.now(),status: false }]);
            setTodo('');
        }
        if(editId){
            const editTodo = toDos.find((todo) => todo.id === editId)
            const updateTodo = toDos.map((todo) =>
                todo.id === editTodo.id ? (todo = {id : editTodo.id, task: toDo}) : (todo ={ id: todo.id, task: todo.task}))
            setTodos(updateTodo);
            setEditId(0);
            setTodo('');
        }   
    }

    const inputRef = useRef('null')
    
    useEffect(()=>{
        inputRef.current.focus()
        
    },[] )

    const onDelete = (id) => {
        setTodos(toDos.filter((todo) => todo.id !== id))
    }

    const onComplete = (id) => {
        let complete = toDos.map((todo) => {
            if(todo.id === id){
                return({...todo,status: !todo.status })
            }
            return todo
        })
        setTodos(complete)
    }

    const onEdit = (id) => {
        const editTodo = toDos.find((todo)=> todo.id === id) 
        setTodo(editTodo.task)
        setEditId(editTodo.id)
        
    }


    return (
        <div className='full-body'>
            <div className='header text-center' >
                <h3>Todo List</h3>
                <div className='form-div' onSubmit={handleSubmit}>
                    <form className='form-group'>
                        <input className="form-control" type="text" placeholder='Create task' 
                           value={toDo} ref={inputRef} onChange={(event) => setTodo(event.target.value)}/>
                        <button className='btn btn-primary' onClick={addTodo}>{editId ? 'Edit': 'Add'}</button>
                    </form>
                </div>
            </div>
           
            <div className='container'>
                <div className='row'>
             
                    {
                    toDos.map((todo)=> (
                        <div className={`card my-3 mx-3 ${todo.status ? "blurred" : ""}`} style={{ maxWidth: '18rem' }}>
                            <div className="card-header">
                                <span >
                                    {todo.task}
                                </span>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Description</p>
                                <p className="card-title">
                                    <span className='buttons'> 
                                        <button type="button" className="btn btn-success btn-sm mx-2"
                                        id="complete" 
                                        title='Complete'
                                        onClick={() => onComplete(todo.id)}
                                        >Complete</button>

                                        <button className='btn btn-outline-primary btn-sm mx-2' 
                                        id="edit" 
                                        title='Edit'
                                        onClick={() => onEdit(todo.id)}>Edit</button>

                                        <button className='btn btn-outline-danger btn-sm mx-2 ' 
                                        id="delete" 
                                        title='Delete'
                                        onClick={() => onDelete(todo.id)}
                                        >Delete</button>

                                    </span>
                                </p>
                                
                            </div>
                            
                        </div>
                    ))
                    }
                    
                    </div>
            
                
             
                
            </div>
        </div>
      
    );
};

export default Todo;