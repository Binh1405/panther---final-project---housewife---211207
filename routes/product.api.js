const express = require('express');
const { createProduct, getAllProduct, updateProduct, deleteProduct, getSingleProduct } = require('../controllers/product.controller');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin.middleware');

router.get('/', getAllProduct);
router.get('/:productId', getSingleProduct);
router.post('/', authenticationMiddleware, isAdmin, createProduct);
router.put('/:productId', authenticationMiddleware, isAdmin, updateProduct);
router.delete('/:productId', authenticationMiddleware, isAdmin, deleteProduct);

module.exports = router