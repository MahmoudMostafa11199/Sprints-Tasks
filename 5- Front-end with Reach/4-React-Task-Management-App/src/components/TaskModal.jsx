function TaskModal({ task, onclick, onchange, isEdit, reset }) {
  const { title, description, category } = task;

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title fs-3" id="staticBackdropLabel">
              Add Task
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={reset}
            ></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="d-flex flex-column gap-1 mb-3">
                <label htmlFor="task-title">Title</label>
                <input
                  className="form-control"
                  type="text"
                  id="task-title"
                  name="title"
                  value={title}
                  onChange={onchange}
                />
              </div>
              <div className="d-flex flex-column gap-1 mb-3">
                <label htmlFor="task-description">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  type="text"
                  id="task-description"
                  name="description"
                  value={description}
                  onChange={onchange}
                ></textarea>
              </div>
              <div className="d-flex flex-column gap-1">
                <label htmlFor="task-type">Task Type</label>
                <select
                  id="task-type"
                  name="category"
                  className="form-select"
                  value={category}
                  onChange={onchange}
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary btn-add"
              data-bs-dismiss="modal"
              disabled={!title || !description}
              onClick={() => onclick(task)}
            >
              {!isEdit ? 'Add' : 'Edit'} Task
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={reset}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
