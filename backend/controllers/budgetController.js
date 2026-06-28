const Budget = require('../models/Budget');

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBudget = async (req, res) => {
  try {
    const newBudget = await Budget.create({ name: req.body.name });
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};