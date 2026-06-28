import React, { useState, useEffect } from 'react';
import Button from '../common/Button';

const CreatePlanForm = ({ budgets, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    date: '',
    budgetId: '',
    tag: '',
  });

  useEffect(() => {
    if (budgets.length > 0) {
      setFormData((prev) =>
        prev.budgetId ? prev : { ...prev, budgetId: budgets[0]._id }
    );
  }
  }, [budgets]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData((prev) => ({ ...prev, date: '', tag: '' }));
  };

  return (
    <div className="card p-4 mb-4">
      <h6 className="fw-bold mb-3">
        <i className="bi bi-calendar-plus me-2"></i>New Daily Schedule
      </h6>
      <form onSubmit={handleSubmit}>
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label className="form-label section-header text-muted">Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label section-header text-muted">Budget</label>
            <select
              className="form-select"
              value={formData.budgetId}
              onChange={(e) => setFormData({ ...formData, budgetId: e.target.value })}
              required
            >
              {budgets.map((budget) => (
                <option key={budget._id} value={budget._id}>
                  {budget.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label section-header text-muted">Primary Tag</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Sightseeing"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <Button type="submit" variant="warning" fullWidth loading={isLoading}>
              Create Schedule
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePlanForm;
