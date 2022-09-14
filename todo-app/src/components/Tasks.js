import Task from "./Task"

const Tasks = ({tasks,onDelete, onToggle}) => {
  return (
    <>
     {tasks.map((task, index)=>(
        //looping through each task - adding a component and
        //passing the task in as a prop
        <Task key={index} task={task}
        onDelete={onDelete}
         onToggle={onToggle} 
            
         />
        ))}   
    </>
  )
}

export default Tasks

