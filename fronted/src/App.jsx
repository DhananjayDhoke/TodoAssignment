import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    const addtodo = {
      todo:newTask
    }
    axios.post("http://localhost:8080/addTodo",addtodo).then(()=>{
      fetchData();
    })
  };

  useEffect(()=>{
    fetchData()
  },[])
  
  function fetchData(){
     axios.get("http://localhost:8080/getTodo")
     .then(data=>setTasks(data.data))
     .catch(e=>console.log(e)) 
   
   }

  const handleDelete = (taskId) => {
    console.log(taskId)
    axios.delete(`http://localhost:8080/deleteTodo/${taskId}`)
    .then(()=>{
      fetchData()
    });
    
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-btn">Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className="task-item">
            <span>{task.todo}</span>
            <button className="delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
