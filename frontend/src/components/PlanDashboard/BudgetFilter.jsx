import React from 'react';

const BudgetFilter = ({ budgets, selectedId, onChange }) => {
  return (
    <select
      className="form-select form-select-sm"
      style={{ width: 'auto', minWidth: '160px' }}
      value={selectedId || ''}
      onChange={(e) => onChange(e.target.value ? e.target.value : null)}
    >
      <option value="">All budgets</option>
      {budgets.map((b) => (
        <option key={b._id} value={b._id}>
          {b.name}
        </option>
      ))}
    </select>
  );
};

export default BudgetFilter;
