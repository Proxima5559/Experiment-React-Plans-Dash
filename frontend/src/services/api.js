
const BASE_URL = 'http://localhost:5000/api';

const api = {
  getPlans: async (page = 1, budgetId = null) => {
    let url = `${BASE_URL}/plans?page=${page}`;
    if (budgetId) url += `&budgetId=${budgetId}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch plans');
    return await res.json();
  },

  getPlan: async (slug) => {
    const res = await fetch(`${BASE_URL}/plans/${slug}`);
    if (!res.ok) throw new Error('Plan not found');
    return await res.json();
  },

  createPlan: async ({ date, budgetId, tag }) => {
    const res = await fetch(`${BASE_URL}/plans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, budgetId, tag })
    });
    if (!res.ok) throw new Error('Failed to create plan');
    return await res.json();
  },

  deletePlan: async (slug) => {
    const res = await fetch(`${BASE_URL}/plans/${slug}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete plan');
    const data = await res.json();
    return data.success;
  },

  addItem: async (slug, description, isMandatory) => {
    const res = await fetch(`${BASE_URL}/plans/${slug}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, isMandatory })
    });
    if (!res.ok) throw new Error('Failed to add item');
    return await res.json();
  },

  toggleItem: async (itemId) => {
    const res = await fetch(`${BASE_URL}/plans/items/${itemId}/toggle`, {
      method: 'PUT'
    });
    if (!res.ok) throw new Error('Failed to toggle item');
    return await res.json();
  },

  deleteItem: async (itemId) => {
    const res = await fetch(`${BASE_URL}/plans/items/${itemId}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete item');
    const data = await res.json();
    return data.success;
  },

  addTag: async (slug, tagName) => {
    const res = await fetch(`${BASE_URL}/plans/${slug}/tags`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tagName })
    });
    if (!res.ok) throw new Error('Failed to add tag');
    return await res.json();
  },

  clearAllTags: async (slug) => {
    const res = await fetch(`${BASE_URL}/plans/${slug}/tags`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to clear tags');
    return await res.json();
  },

  getBudgets: async () => {
    const res = await fetch(`${BASE_URL}/budgets`);
    if (!res.ok) throw new Error('Failed to fetch budgets');
    return await res.json();
  }
};

export default api;
