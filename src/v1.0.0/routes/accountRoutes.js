const express = require('express');
const router = express.Router();
const { findAccount, createAccount, checkLogIn } = require('../controllers/accountController');

//Get | www.localhost:3872/api/v1.0.0/accounts
router.get("/", findAccount);
router.post("/register", createAccount);
router.post("/login", checkLogIn);

module.exports = router;