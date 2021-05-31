import {useState, useEffect} from 'react';
import './tasks.styles.css';

import AddTaskForm from '../../components/add-task-form/add-task-form.component';
import TasksList from '../../components/tasks-list/tasks-list.component';

import axios from 'axios';

const TasksPage = () => {

    const [Tasks, setTasks] = useState([])
    const [inputV, setInputV] = useState('')

    useEffect(() => {
        axios.get('/task', {withCredentials: true})
        .then(res => setTasks(res.data))
        .catch(e => console.log(e)) 
    }, [])

    const handleChange = e => {
        setInputV(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();

        const data = {description: inputV, completed: false}

        axios.post('/task', data, {withCredentials: true})
        .then(res => {           
            setTasks([...Tasks, {...res.data}])
        })
        .catch(e => console.log(e))

        setInputV('')
    }

    const deleteTask = taskToRemove => {
        const filteredTasks = Tasks.filter(task => task._id !== taskToRemove._id)
        setTasks(filteredTasks)
    }

    return (
        <div className="tasks container">
            <AddTaskForm inputV={inputV} handleChange={handleChange} handleSubmit={handleSubmit} />
            <TasksList Tasks={Tasks} setTasks={setTasks} deleteTask={deleteTask} />
        </div>
    )
}

export default TasksPage;