const express = require('express');
const router = express.Router();
const nxbController = require('../controllers/NhaXuatBanController');

router.get('/get-all-nxb', nxbController.getAllNXB);
router.get('/get-nxb-detail/:id', nxbController.getNXBDetail);
router.post('/create-nxb', nxbController.createNXB);
router.put('/update-nxb/:id', nxbController.updateNXB);
router.delete('/delete-nxb/:id', nxbController.deleteNXB);

module.exports = router;