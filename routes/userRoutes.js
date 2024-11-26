const express = require('express')

const { createNewProduct, getAllProducts, updateProduct, deleteProduct, getProductById } = require('../controller/productController')
const { signUpUser, loginUser } = require('../controller/userController')
const router = express.Router()

router.post('/create', signUpUser)
router.post('/login', loginUser)

module.exports = router;