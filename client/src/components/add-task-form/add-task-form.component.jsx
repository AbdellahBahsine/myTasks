const AddTaskForm = ({inputV, handleChange, handleSubmit}) => {
 
    return (
        <form action="" className="d-flex add-task-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <input type="text" placeholder="Add a new task..." value={inputV} onChange={handleChange} className="form-control p-2" />
                <div className="input-group-append">
                    <button className="btn btn-danger text-white">Add</button>
                </div>
            </div>
        </form>
    )
}

export default AddTaskForm;