import React, { useState } from 'react';
import CreatePlanForm from './CreatePlanForm';
import BudgetFilter from './BudgetFilter';
import PlanList from './PlanList';
import api from '../../services/api';

const PlanSection = ({
  plans,
  pagination,
  userBudgets,
  selectedBudgetId,
  onPlanCreated,
  onPlanDeleted,
  onBudgetFilterChange,
  onPageChange,
  error,
}) => {
  const [creating, setCreating] = useState(false);

  const handleCreatePlan = async (formData) => {
    setCreating(true);
    try {
      const newPlan = await api.createPlan(formData);
      onPlanCreated(newPlan);
    } catch (err) {
      console.error('Failed to create plan:', err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="plans-section">
      <CreatePlanForm
        onSubmit={handleCreatePlan}
        budgets={userBudgets}
        isLoading={creating}
      />
      <div className="plans-header">
        <h5 className="fw-bold mb-0">Your Plans</h5>
        <BudgetFilter
          budgets={userBudgets}
          selectedId={selectedBudgetId}
          onChange={onBudgetFilterChange}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <PlanList
        plans={plans}
        pagination={pagination}
        onPlanDeleted={onPlanDeleted}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PlanSection;
