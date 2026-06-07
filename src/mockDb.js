
let nextItemId = 20;
let nextPlanSlug = 5;

export const DB = {
  budgets: [
    { id: 1, name: "Paris Trip 2025" },
    { id: 2, name: "Tokyo Summer" },
    { id: 3, name: "Road Trip USA" },
  ],
  plans: [
    {
      slug: "plan-001",
      budgetId: 1,
      date: "2025-07-14",
      tag: "Sightseeing,Culture",
      items: [
        { id: 1, description: "Visit Eiffel Tower at sunrise", isCompleted: true, isMandatory: true },
        { id: 2, description: "Louvre Museum — 2hr slot booked", isCompleted: false, isMandatory: true },
        { id: 3, description: "Seine River evening cruise", isCompleted: false, isMandatory: false },
        { id: 4, description: "Buy croissants at Poilâne bakery", isCompleted: true, isMandatory: false },
      ],
    },
    {
      slug: "plan-002",
      budgetId: 1,
      date: "2025-07-15",
      tag: "Food,Evening",
      items: [
        { id: 5, description: "Montmartre walking tour (3hrs)", isCompleted: false, isMandatory: true },
        { id: 6, description: "Lunch reservation at Le Comptoir", isCompleted: false, isMandatory: true },
        { id: 7, description: "Sacré-Cœur sunset photos", isCompleted: false, isMandatory: false },
      ],
    },
    {
      slug: "plan-003",
      budgetId: 2,
      date: "2025-08-03",
      tag: "Temples,Food",
      items: [
        { id: 8, description: "Senso-ji Temple early morning visit", isCompleted: true, isMandatory: true },
        { id: 9, description: "Shibuya crossing at dusk", isCompleted: false, isMandatory: true },
        { id: 10, description: "Ramen at Ichiran Shibuya", isCompleted: false, isMandatory: false },
        { id: 11, description: "TeamLab Planets tickets pre-booked", isCompleted: false, isMandatory: false },
      ],
    },
    {
      slug: "plan-004",
      budgetId: 3,
      date: "2025-09-20",
      tag: "Nature,Hiking",
      items: [
        { id: 12, description: "Grand Canyon South Rim hike (Bright Angel trail)", isCompleted: false, isMandatory: true },
        { id: 13, description: "Pack extra water (3L per person)", isCompleted: false, isMandatory: true },
        { id: 14, description: "Sunset photos at Yavapai Point", isCompleted: false, isMandatory: false },
        { id: 15, description: "Book Phantom Ranch dinner in advance", isCompleted: true, isMandatory: false },
      ],
    },
  ],
};

export const mockApi = {
  getPlans: async (page = 1, budgetId = null) => {
    await delay(200);
    let plans = [...DB.plans];
    if (budgetId) plans = plans.filter((p) => p.budgetId === Number(budgetId));
    const limit = 10;
    const total = plans.length;
    const paginated = plans.slice((page - 1) * limit, page * limit);
    return {
      plans: paginated.map((p) => ({
        slug: p.slug,
        date: p.date,
        budgetName: DB.budgets.find((b) => b.id === p.budgetId)?.name || "",
        itemCount: p.items.length,
        items: p.items.slice(0, 3),
        tags: p.tag ? p.tag.split(",") : [],
      })),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    };
  },

  getPlan: async (slug) => {
    await delay(150);
    const plan = DB.plans.find((p) => p.slug === slug);
    if (!plan) throw new Error("Plan not found");
    return {
      plan: {
        slug: plan.slug,
        date: plan.date,
        budgetName: DB.budgets.find((b) => b.id === plan.budgetId)?.name || "",
        tags: plan.tag ? plan.tag.split(",") : [],
      },
      mandatory: plan.items.filter((i) => i.isMandatory),
      secondary: plan.items.filter((i) => !i.isMandatory),
    };
  },

  createPlan: async ({ date, budgetId, tag }) => {
    await delay(200);
    const slug = `plan-${String(nextPlanSlug++).padStart(3, "0")}`;
    const newPlan = {
      slug,
      budgetId: Number(budgetId),
      date,
      tag: tag || null,
      items: [],
    };
    DB.plans.unshift(newPlan);
    return {
      slug,
      date,
      budgetName: DB.budgets.find((b) => b.id === newPlan.budgetId)?.name || "",
      itemCount: 0,
      items: [],
      tags: tag ? [tag] : [],
    };
  },

  deletePlan: async (slug) => {
    await delay(150);
    const idx = DB.plans.findIndex((p) => p.slug === slug);
    if (idx > -1) DB.plans.splice(idx, 1);
    return true;
  },

  addItem: async (slug, description, isMandatory) => {
    await delay(150);
    const plan = DB.plans.find((p) => p.slug === slug);
    if (!plan) throw new Error("Plan not found");
    const item = { id: nextItemId++, description, isCompleted: false, isMandatory: !!isMandatory };
    plan.items.push(item);
    return item;
  },

  toggleItem: async (itemId) => {
    await delay(100);
    for (const plan of DB.plans) {
      const item = plan.items.find((i) => i.id === itemId);
      if (item) {
        item.isCompleted = !item.isCompleted;
        return { ...item };
      }
    }
    throw new Error("Item not found");
  },

  deleteItem: async (itemId) => {
    await delay(100);
    for (const plan of DB.plans) {
      const idx = plan.items.findIndex((i) => i.id === itemId);
      if (idx > -1) { plan.items.splice(idx, 1); return true; }
    }
    return true;
  },

  addTag: async (slug, tagName) => {
    await delay(100);
    const plan = DB.plans.find((p) => p.slug === slug);
    if (!plan) throw new Error("Plan not found");
    const tags = plan.tag ? plan.tag.split(",") : [];
    if (!tags.includes(tagName)) { tags.push(tagName); plan.tag = tags.join(","); }
    return tags;
  },

  clearAllTags: async (slug) => {
    await delay(100);
    const plan = DB.plans.find((p) => p.slug === slug);
    if (plan) plan.tag = null;
    return [];
  },

  getBudgets: async () => {
    await delay(100);
    return [...DB.budgets];
  },
};

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
