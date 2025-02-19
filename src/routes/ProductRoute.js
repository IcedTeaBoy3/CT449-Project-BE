const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
// GET /api/products
router.get('/get-all-products', productController.getAllProducts);
router.get('/get-product-detail', productController.getProductDetail);
router.post('/create-product', productController.createProduct);
router.put('/update-product', productController.updateProduct);
router.delete('/delete-product', productController.deleteProduct);


module.exports = router;