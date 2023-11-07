import React ,{useState}from 'react'
import { TodoForm } from './TodoForm'
import {v4 as uuidv4}from 'uuid';
import { Todo } from './Todo';
uuidv4();
export const TodoWrapper = () => {
  const [todos,setTodos]=useState([])

   const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  }
  const toggleComplete=id=>{
    setTodos(todos.map(todo=>todo.id===id?{...todo,completed:!todo.completed}:todo))
  }

  const deleteTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
}
const editTodo=id=>{
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    )
  );
}

  return (
    <div className='TodoWrapper'>
      <h1>Get Things Do</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo)=>(
      <Todo key={todo.id}
      task={todo}
      deleteTodo={deleteTodo}
     editTodo={editTodo}
      toggleComplete={toggleComplete}
      />
      ))}
      
    </div>
  )
}
