const express = require('express');
const router = express.Router();
const { findItem } = require('../controllers/itemcontroller');

//Get | www.localhost:3872/api/v1.0.0/items
router.get("/:itemName", findItem);

module.exports = router;