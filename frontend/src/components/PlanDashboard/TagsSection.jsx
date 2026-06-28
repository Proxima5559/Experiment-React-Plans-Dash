import React, { useState } from 'react';
import Button from '../common/Button';

const TagsSection = ({ tags, onAddTag, onClearAll }) => {
  const [newTag, setNewTag] = useState('');
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    setAdding(true);
    await onAddTag(newTag.trim());
    setNewTag('');
    setAdding(false);
  };

  return (
    <div className="tags-section">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h6 className="small fw-bold text-uppercase text-muted mb-0">
          <i className="bi bi-tags-fill me-1"></i>Tags
        </h6>
        {tags.length > 0 && (
          <Button variant="danger" size="sm" onClick={onClearAll}>
            Clear All
          </Button>
        )}
      </div>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {tags.length > 0 ? (
          tags.map((tag, idx) => (
            <span key={idx} className="badge rounded-pill tag-badge">
              #{tag}
            </span>
          ))
        ) : (
          <p className="text-muted small fst-italic mb-0">No tags</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control form-control-sm rounded-pill"
          placeholder="Add tag + Enter"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          disabled={adding}
        />
      </form>
    </div>
  );
};

export default TagsSection;
