import {useState} from 'react';
import './task.styles.css';

import axios from 'axios';

const Task = ({id, task, editTask, deleteTask}) => {

    const [isCompleted, setIsCompleted] = useState(task.completed)
    const [isEdit, setIsEdit] = useState(false)
    const [inputV, setInputV] = useState(task.description)

    const handleChange = e => {
        setInputV(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()

        editTask(id, inputV)

        setIsEdit(false)
    }

    const handleDelete = () => {
        axios.delete(`/task/${id}`, {withCredentials: true})
        .then(res => console.log(res))
        .catch(e => console.log(e))

        deleteTask(id, task)
    }
 
    return (
        <div className="rounded mb-2 d-flex justify-content-between align-items-center p-2 task">
            {
            isEdit
            ? 
            <form action="" className="w-100" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" value={inputV} onChange={handleChange} className="form-control" />
                    <div className="input-group-append">
                        <button className="btn btn-danger text-white">Save</button>
                    </div>
                </div>
            </form>
            :
            <div className="d-flex w-100">
                <div className="form-check d-flex align-items-center w-100">
                <input className="form-check-input" type="checkbox" onClick={() => setIsCompleted(!isCompleted)} />
                <p className={isCompleted ? "mb-0 completed" : "mb-0"}>{task.description}</p>
                </div>
                <div className="d-flex">
                    <button className="btn btn-danger text-white  d-flex justify-content-center align-items-center" onClick={() => setIsEdit(true)}><i className="far fa-edit"></i></button>
                    <button className="btn btn-danger ml-2 text-white d-flex justify-content-center align-items-center" onClick={() => handleDelete()}><i className="fas fa-times"></i></button>
                </div>
            </div>
            }
        </div>
    )
}

export default Task;