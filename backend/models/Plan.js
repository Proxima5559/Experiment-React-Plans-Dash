const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  isMandatory: { type: Boolean, default: false }
});

const PlanSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  budgetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Budget', required: true },
  date: { type: String, required: true }, 
  tags: [{ type: String }],
  items: [ItemSchema]
});

module.exports = mongoose.model('Plan', PlanSchema);