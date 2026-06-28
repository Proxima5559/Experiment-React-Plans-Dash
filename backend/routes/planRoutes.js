const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

router.get('/',    planController.getPlans);
router.post('/',   planController.createPlan);

router.put('/items/:itemId/toggle', planController.toggleItem);
router.delete('/items/:itemId',     planController.deleteItem);

router.get('/:slug',    planController.getPlanBySlug);
router.delete('/:slug', planController.deletePlan);
router.post('/:slug/items', planController.addItem);
router.post('/:slug/tags',  planController.addTag);
router.delete('/:slug/tags', planController.clearAllTags);

module.exports = router;