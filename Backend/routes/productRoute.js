const express = require('express')
const Product = require('../models/productModel')
const {getProducts, getProduct, addProduct, updateProduct, deleteProduct} = require('../controller/productController')

const router = express.Router()

// get all products
router.get('/', getProducts);

// get product by id
router.get('/:id', getProduct)

// add a product
router.post('/', addProduct)

// update a product by id
router.put('/:id', updateProduct)

// delete a product by id
router.delete('/:id', deleteProduct)

module.exports = router