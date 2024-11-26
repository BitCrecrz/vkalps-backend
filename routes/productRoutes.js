const express = require('express')

const { createNewProduct, getAllProducts, updateProduct, deleteProduct, getProductById } = require('../controller/productController')
const upload = require('../middleware/multer')
const router = express.Router()

router.post('/create', upload.single('image'), createNewProduct)
router.get('/get', getAllProducts)
router.get('/get/:id', getProductById)
router.put('/update/:id', upload.single('image'), updateProduct)
router.delete('/delete/:id', deleteProduct)

module.exports = router;