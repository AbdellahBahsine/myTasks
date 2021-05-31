import Task from '../task/task.component';

import axios from 'axios';

const TasksList = ({Tasks, setTasks, deleteTask}) => {


    const editTask = (id, updatedTask) => {
        const updatedTasks = Tasks.map(task => {
            if(task._id === id){
                return ({...task, description: updatedTask})
            }
            return task
        })

        axios.patch(`/task/${id}`, {description: updatedTask}, {withCredentials: true})
        .then(() => setTasks(updatedTasks))
        .catch(e => console.log(e))
    }

    return (
        <div>
            <div className="w-100 my-4 border"></div>
            {Tasks.map(task => <Task key={task._id} id={task._id} task={task} editTask={editTask} deleteTask={deleteTask} />)}
        </div>
    )
}

export default TasksList;