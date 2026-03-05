const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { authToken, authRole } = require('../middleware/authMiddleware');

router.get('/', authToken, authRole("Admin"), accountController.getAllAccounts);
router.post('/register', authToken, authRole("Admin"), accountController.createAccount);
router.post('/login', accountController.login);
router.get('/:id', authToken, authRole("Admin"), accountController.findById);
router.put('/:id/status', authToken, authRole("Admin"), accountController.updateStatus);
router.put('/:id/role', authToken, authRole("Admin"), accountController.updateRole);
router.put('/:id/password', authToken, authRole("Admin"), accountController.updatePassword);
router.put('/:id/email', authToken, authRole("Admin"), accountController.updateEmail);
router.put('/:id/username', authToken, authRole("Admin"), accountController.updateUsername);
router.delete('/:id', authToken, authRole("Admin"), accountController.deleteAccount);

module.exports = router;