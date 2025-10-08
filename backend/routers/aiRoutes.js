const express = require('express');
const router = express.Router();
const { categorizeTaskController , bulkCreateTasksController } = require('../controllers/aiController.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.post('/categorize',  authMiddleware, categorizeTaskController);
router.post('/bulk-create', authMiddleware, bulkCreateTasksController);

module.exports = router;