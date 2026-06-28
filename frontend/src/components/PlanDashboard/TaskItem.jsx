import React, { useState } from 'react';
import Button from '../common/Button';

const TaskItem = ({ item, onToggle, onDelete }) => {
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleToggle = async () => {
    setToggling(true);
    await onToggle(item._id);
    setToggling(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(item._id);
    setDeleting(false);
  };

  return (
    <div className="list-group-item border-0 px-3 py-3 mb-2 rounded-3 task-item">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center flex-grow-1 gap-3">
          <input
            className="form-check-input mt-0 flex-shrink-0"
            type="checkbox"
            checked={item.isCompleted}
            onChange={handleToggle}
            disabled={toggling}
          />
          <span className={`fw-medium ${item.isCompleted ? 'completed-task' : ''}`}>
            {item.description}
          </span>
        </div>
        <div className="d-flex align-items-center gap-2 ms-3">
          {!item.isMandatory && (
            <span className="badge rounded-pill text-muted small optional-badge">
              Optional
            </span>
          )}
          <Button variant="danger" size="sm" onClick={handleDelete} loading={deleting}>
            🗑️
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
