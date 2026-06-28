import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ title, items, icon, iconColor, onToggle, onDelete }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-5">
      <h6 className="section-header mb-3" style={{ color: iconColor }}>
        <i className={`bi bi-${icon} me-2`}></i>
        {title}
      </h6>
      <div className="list-group list-group-flush">
        {items.map((item) => (
          <TaskItem
            key={item._id}
            item={item}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
