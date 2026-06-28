import React, { useState, useEffect } from 'react';
import PlanSection from './PlanSection';
import Spinner from '../common/Spinner';
import api from '../../services/api';
import '../../styles/plans.css';

const PlanDashboard = () => {
  const [plans, setPlans] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [userBudgets, setUserBudgets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => { fetchUserBudgets(); }, []);
  useEffect(() => { fetchPlans(); }, [selectedBudgetId]);

  const fetchPlans = async (page = 1) => {
    setLoading(true);
    try {
      const data = await api.getPlans(page, selectedBudgetId);
      setPlans(data.plans);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBudgets = async () => {
    try {
      const data = await api.getBudgets();
      setUserBudgets(data);
    } catch (err) {
      console.error('Failed to fetch budgets:', err);
    }
  };

  const handlePlanCreated = (newPlan) => {
    setPlans((prev) => [newPlan, ...prev]);
  };

  const handlePlanDeleted = (slug) => {
    setPlans((prev) => prev.filter((p) => p.slug !== slug));
  };

  const handleBudgetFilterChange = (budgetId) => {
    setSelectedBudgetId(budgetId);
  };

  if (loading && plans.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="plans-dashboard">
      <PlanSection
        plans={plans}
        pagination={pagination}
        userBudgets={userBudgets}
        selectedBudgetId={selectedBudgetId}
        onPlanCreated={handlePlanCreated}
        onPlanDeleted={handlePlanDeleted}
        onBudgetFilterChange={handleBudgetFilterChange}
        onPageChange={(page) => fetchPlans(page)}
        error={error}
      />
    </div>
  );
};

export default PlanDashboard;
