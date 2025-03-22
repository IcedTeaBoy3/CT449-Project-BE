const express = require('express');
const router = express.Router();
const borrowBookController = require('../controllers/BorrowBookController');
const authMiddleware = require('../middleware/AuthMiddleware');
const { authUserMiddleWare, authMiddleWare } = authMiddleware;
// GET /api/users
router.post('/create-borrow-book', borrowBookController.createBorrowBook);
router.get('/get-all-borrow-book/:id',authUserMiddleWare, borrowBookController.getAllBorrowBookByUser);
router.put('/return-book/:id', borrowBookController.returnBook);
router.get('/get-all-borrow-book', authMiddleWare, borrowBookController.getAllBorrowBookAdmin);
router.put('/approve-borrow-book/:id', authMiddleWare,borrowBookController.approveBorrowBook);
router.delete('/delete-borrow-book/:id',authMiddleWare, borrowBookController.deleteBorrowBook);
router.get('/count-borrow-book',authMiddleWare, borrowBookController.countBorrowBook);
module.exports = router;
