const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
// GET /api/users
router.get('/get-all-users', userController.getAllUsers);
router.get('/get-user-detail', userController.getUserDetail);
router.post('/create-user', userController.createUser);
router.put('/update-user', userController.updateUser);
router.delete('/delete-user', userController.deleteUser);

module.exports = router;
