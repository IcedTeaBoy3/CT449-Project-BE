const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
// GET /api/users
router.get('/get-all-users', userController.getAllUsers);
router.get('/get-user-detail/:id', userController.getUserDetail);
router.post('/create-user', userController.createUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;
