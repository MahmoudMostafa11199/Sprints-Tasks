import { BsTrash3, BsPencil } from 'react-icons/bs';

function TaskCard({ task, onDelete, onEdit }) {
  const { id, title, description, category } = task;

  return (
    <div
      className={`task col-12 col-md-4 col-lg-3 flex-grow-1 border-start border-3 bg-white rounded-2 p-3 position-relative ${category}`}
    >
      <h4>{title}</h4>
      <p className="text-secondary">{description}</p>
      <div className="d-flex justify-content-end gap-2">
        <button
          className="btn btn-outline-primary d-flex align-items-center py-2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => onEdit(task)}
        >
          <BsPencil />
        </button>
        <button
          className="btn btn-outline-danger d-flex align-items-center py-2"
          onClick={() => onDelete(id)}
        >
          <BsTrash3 />
        </button>
      </div>
      <span className="category text-white position-absolute custom-category py-1 px-2 rounded-2 text-capitalize">
        {category}
      </span>
    </div>
  );
}

export default TaskCard;
