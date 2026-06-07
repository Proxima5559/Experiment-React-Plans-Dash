import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import api from '../../services/api';

const PlanCard = ({ plan, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    setDeleting(true);
    try {
      await api.deletePlan(plan.slug);
      onDelete(plan.slug);
    } catch (err) {
      console.error('Failed to delete plan:', err);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="plan-card card mb-3 p-0">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-0 fw-bold">{formatDate(plan.date)}</h5>
            <small className="text-muted">
              <i className="bi bi-geo-alt-fill me-1"></i>
              {plan.budgetName}
            </small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill text-muted">
              {plan.itemCount || 0} Tasks
            </span>
            <Link to={`/plan/${plan.slug}`}>
              <Button variant="outline-warning" size="sm" rounded>
                Checklist
              </Button>
            </Link>
            <Button variant="danger" size="sm" onClick={handleDelete} loading={deleting}>
              🗑️
            </Button>
          </div>
        </div>

        {plan.items && plan.items.length > 0 && (
          <div className="mb-3 py-2 px-3 rounded-3 tasks-preview">
            <span className="section-header text-muted d-block mb-2">
              <i className="bi bi-check2-square me-1"></i>Tasks
            </span>
            {plan.items.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="small fw-medium d-flex align-items-start mb-1"
              >
                <span className="me-2">•</span>
                <span className="text-break">{item.description}</span>
              </div>
            ))}
            {plan.itemCount > 3 && (
              <div className="small text-muted">+{plan.itemCount - 3} more</div>
            )}
          </div>
        )}

        {plan.tags && plan.tags.length > 0 && (
          <div className="d-flex flex-wrap gap-2 pt-2 tags-container">
            {plan.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`badge rounded-pill fw-bold ${idx === 0 ? 'primary-tag' : 'secondary-tag'}`}
              >
                {idx === 0 && <i className="bi bi-star-fill me-1 small"></i>}
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
