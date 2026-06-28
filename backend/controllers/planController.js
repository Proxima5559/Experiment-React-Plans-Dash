const Plan = require('../models/Plan');
const Budget = require('../models/Budget');

exports.getPlans = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const budgetId = req.query.budgetId;
    const limit = 10;

    let queryFilter = {};
    if (budgetId) {
      queryFilter.budgetId = budgetId;
    }

    const total = await Plan.countDocuments(queryFilter);
    const plans = await Plan.find(queryFilter)
      .populate('budgetId', 'name') 
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const formattedPlans = plans.map((p) => {
      const planObj = p.toObject();

      return {
        slug: planObj.slug,
        date: planObj.date,
        budgetName: planObj.budgetId?.name || "",
        itemCount: planObj.items ? planObj.items.length : 0,
        items: planObj.items ? planObj.items.slice(0, 3) : [], 
        tags: planObj.tags || [],
      };
    });

    res.json({
      plans: formattedPlans,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPlanBySlug = async (req, res) => {
  try {
    const plan = await Plan.findOne({ slug: req.params.slug }).populate('budgetId', 'name');
    if (!plan) return res.status(404).json({ error: "Plan not found" });
    
    const planObj = plan.toObject();
    const items = planObj.items || [];

    res.json({
      plan: {
        slug: planObj.slug,
        date: planObj.date,
        budgetName: planObj.budgetId?.name || "",
        tags: planObj.tags,
        items: items,
      },
      mandatory: plan.items.filter((i) => i.isMandatory),
      secondary: plan.items.filter((i) => !i.isMandatory),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPlan = async (req, res) => {
  try {
    const { date, budgetId, tag } = req.body;

    const count = await Plan.countDocuments();
    const slug = `plan-${String(count + 1).padStart(3, "0")}`;

    const tags = tag ? [tag] : [];
    const newPlan = await Plan.create({ slug, budgetId, date, tags, items: [] });
    const populated = await newPlan.populate('budgetId', 'name');

    res.status(201).json({
      slug: populated.slug,
      date: populated.date,
      budgetName: populated.budgetId?.name || "",
      itemCount: 0,
      items: [],
      tags: populated.tags,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const result = await Plan.findOneAndDelete({ slug: req.params.slug });
    if (!result) return res.status(404).json({ error: "Plan not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { description, isMandatory } = req.body;
    const plan = await Plan.findOne({ slug: req.params.slug });
    if (!plan) return res.status(404).json({ error: "Plan not found" });

    plan.items.push({ description, isMandatory: !!isMandatory });
    await plan.save();

    res.status(201).json(plan.items[plan.items.length - 1]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleItem = async (req, res) => {
  try {
    const plan = await Plan.findOne({ "items._id": req.params.itemId });
    if (!plan) return res.status(404).json({ error: "Item not found" });

    const item = plan.items.id(req.params.itemId);
    item.isCompleted = !item.isCompleted;
    await plan.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const plan = await Plan.findOne({ "items._id": req.params.itemId });
    if (!plan) return res.status(404).json({ error: "Item not found" });

    plan.items.pull(req.params.itemId);
    await plan.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTag = async (req, res) => {
  try {
    const { tagName } = req.body;
    const plan = await Plan.findOne({ slug: req.params.slug });
    if (!plan) return res.status(404).json({ error: "Plan not found" });

    if (!plan.tags.includes(tagName)) {
      plan.tags.push(tagName);
      await plan.save();
    }
    res.json(plan.tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.clearAllTags = async (req, res) => {
  try {
    const plan = await Plan.findOne({ slug: req.params.slug });
    if (!plan) return res.status(404).json({ error: "Plan not found" });

    plan.tags = [];
    await plan.save();
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};