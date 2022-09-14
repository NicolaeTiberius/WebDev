import { useState, useEffect } from "react"
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from "./components/AddTask"
import Footer from "./components/Footer" 
import About from "./components/About"

const App = () => {

    const[showAddTask, setShowAddTask] = useState(false)

    //part of component and uses state to set the values in there.
    //use the function setTasks to modify 
    //state is immutable - its re-created and sent again

    const[tasks,setTasks] = useState([  ])  

    useEffect(()=> {
      const getTasks = async () =>{
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
      }
      getTasks()
    },
    [])

    //Fetch data/ TASKS 
    const fetchTasks = async () =>{
      const res = await fetch('http://localhost:5000/tasks')
      const data =await res.json()

      return data 
    }

      //Fetch data/ TASKS 
      const fetchTask = async (id) =>{
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data =await res.json()
  
        return data 
      }



  //Add task
  const addTask =  async (task) =>
  {
    const res =  await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()

    setTasks([...tasks,data])
    // console.log(task);
    // const id = Math.floor(Math.random()* 10000) + 1 
    // console.log(id)
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = async (id) =>
  {
    //DELETE REQUEST IN JSON SERVER
    await  fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })
    
    //filter tasks by not showing the tasks that have been 
    //deleted for the user's side.
    setTasks(tasks.filter((task)=> task.id !== id ))
  }
  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle,reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

      setTasks(tasks.map((task) =>
      task.id === id ? {...task, 
        reminder: !data.reminder }
         : task     
        )
      )
  }

  return (
    <Router>
    <div className="container">
    <Header onAdd={()=> setShowAddTask
    (!showAddTask)} 
    showAdd={showAddTask}  />

    {showAddTask && <AddTask onAdd={addTask} />}
    
    {tasks.length > 0 ? <Tasks tasks={tasks} 
    onDelete={deleteTask} onToggle={toggleReminder}/> :(
       'No Tasks to Show'
    )}

    <Footer/>
    </div>
    </Router>
  )
}



export default App;
