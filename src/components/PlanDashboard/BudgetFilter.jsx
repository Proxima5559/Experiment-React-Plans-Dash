import React from 'react';

const BudgetFilter = ({ budgets, selectedId, onChange }) => {
  return (
    <select
      className="form-select form-select-sm"
      style={{ width: 'auto', minWidth: '160px' }}
      value={selectedId || ''}
      onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
    >
      <option value="">All budgets</option>
      {budgets.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name}
        </option>
      ))}
    </select>
  );
};

export default BudgetFilter;
