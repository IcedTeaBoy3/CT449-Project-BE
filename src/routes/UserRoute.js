const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/AuthMiddleware');
const { authUserMiddleWare, authMiddleWare } = authMiddleware;
// GET /api/users
router.get('/get-all-users',authMiddleWare, userController.getAllUsers);
router.get('/get-user-detail/:id',authUserMiddleWare, userController.getUserDetail);
router.post('/login-user',userController.loginUser);
router.post('/create-user', userController.createUser);
router.put('/update-user/:id',authUserMiddleWare, userController.updateUser);
router.delete('/delete-user/:id', authMiddleWare ,userController.deleteUser);

module.exports = router;
