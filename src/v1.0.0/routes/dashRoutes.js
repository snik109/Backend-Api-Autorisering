const express = require('express');
const { adminDashboard } = require('../controllers/dashController');
const { authToken, authRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.get("/", authToken, authRole("Admin"), adminDashboard);

module.exports = router;