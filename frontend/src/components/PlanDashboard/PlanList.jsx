import React from 'react';
import PlanCard from './PlanCard';
import Pagination from '../common/Pagination';

const PlanList = ({ plans, pagination, onPlanDeleted, onPageChange }) => {
  if (!plans || plans.length === 0) {
    return (
      <div className="text-center py-5 opacity-75">
        <i className="bi bi-calendar2-x display-4 text-muted"></i>
        <p className="mt-2 text-muted">No plans scheduled for your trips yet.</p>
      </div>
    );
  }

  return (
    <div className="plans-container">
      {plans.map((plan) => (
        <PlanCard key={plan.slug} plan={plan} onDelete={onPlanDeleted} />
      ))}
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default PlanList;
