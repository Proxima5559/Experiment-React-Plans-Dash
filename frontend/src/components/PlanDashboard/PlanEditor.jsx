import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskList from './TaskList';
import TagsSection from './TagsSection';
import Button from '../common/Button';
import api from '../../services/api';

const PlanEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [mandatory, setMandatory] = useState([]);
  const [secondary, setSecondary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState('');
  const [isMandatory, setIsMandatory] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPlan();
  }, [slug]);

  const fetchPlan = async () => {
    setLoading(true);
    try {
      const data = await api.getPlan(slug);
      setPlan(data.plan);
      setMandatory(data.mandatory || []);
      setSecondary(data.secondary || []);
    } catch (err) {
      console.error('Failed to fetch plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setSubmitting(true);
    try {
      const newItem = await api.addItem(slug, newTask, isMandatory);
      if (newItem.isMandatory) {
        setMandatory((prev) => [...prev, newItem]);
      } else {
        setSecondary((prev) => [...prev, newItem]);
      }
      setNewTask('');
    } catch (err) {
      console.error('Failed to add task:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleItem = async (itemId, isMandatoryItem) => {
    try {
      const updatedItem = await api.toggleItem(itemId);
      if (isMandatoryItem) {
        setMandatory((prev) =>
          prev.map((item) => (item._id === itemId ? updatedItem : item))
        );
      } else {
        setSecondary((prev) =>
          prev.map((item) => (item._id === itemId ? updatedItem : item))
        );
      }
    } catch (err) {
      console.error('Failed to toggle item:', err);
    }
  };

  const handleDeleteItem = async (itemId, isMandatoryItem) => {
    try {
      await api.deleteItem(itemId);
      if (isMandatoryItem) {
        setMandatory((prev) => prev.filter((item) => item._id !== itemId));
      } else {
        setSecondary((prev) => prev.filter((item) => item._id !== itemId));
      }
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const handleAddTag = async (tagName) => {
    try {
      const updatedTags = await api.addTag(slug, tagName);
      setPlan((prev) => ({ ...prev, tags: updatedTags }));
    } catch (err) {
      console.error('Failed to add tag:', err);
    }
  };

  const handleClearTags = async () => {
    try {
      const updatedTags = await api.clearAllTags(slug);
      setPlan((prev) => ({ ...prev, tags: updatedTags }));
    } catch (err) {
      console.error('Failed to clear tags:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading plan...</div>;
  }

  if (!plan) {
    return <div className="text-center py-5">Plan not found</div>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="fw-bold mb-0">
            {new Date(plan.date + 'T12:00:00').toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </h2>
          <div className="text-muted mt-1">
            <i className="bi bi-airplane-engines me-1"></i>
            <span>{plan.budgetName}</span>
          </div>
        </div>
        <Button
          variant="outline-secondary"
          size="sm"
          rounded
          onClick={() => navigate('/plans')}
        >
          ← Plan Dashboard
        </Button>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card p-4 sticky-top" style={{ top: '16px' }}>
            <h5 className="fw-bold mb-3">Build Schedule</h5>

            <form onSubmit={handleAddTask}>
              <div className="mb-3">
                <label className="form-label section-header text-muted">
                  Add Task
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Go to the sea..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    required
                    autoFocus
                  />
                  <Button type="submit" variant="success" loading={submitting}>
                    Add
                  </Button>
                </div>
              </div>

              <div className="form-check form-switch mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="mandatorySwitch"
                  checked={isMandatory}
                  onChange={(e) => setIsMandatory(e.target.checked)}
                />
                <label
                  className="form-check-label text-muted"
                  htmlFor="mandatorySwitch"
                >
                  Mark as Mandatory
                </label>
              </div>
            </form>

            <hr className="my-4" />

            <TagsSection
              tags={plan.tags || []}
              onAddTag={handleAddTag}
              onClearAll={handleClearTags}
            />
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card p-4">
            {mandatory.length === 0 && secondary.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <i className="bi bi-clipboard2-x display-4"></i>
                <p className="mt-2">No tasks yet. Add one on the left.</p>
              </div>
            ) : (
              <>
                <TaskList
                  title="Mandatory Tasks"
                  items={mandatory}
                  icon="exclamation-triangle-fill"
                  iconColor="#ff6b6b"
                  onToggle={(id) => handleToggleItem(id, true)}
                  onDelete={(id) => handleDeleteItem(id, true)}
                />
                <TaskList
                  title="Secondary Tasks"
                  items={secondary}
                  icon="list-stars"
                  iconColor="text-muted"
                  onToggle={(id) => handleToggleItem(id, false)}
                  onDelete={(id) => handleDeleteItem(id, false)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanEditor;
