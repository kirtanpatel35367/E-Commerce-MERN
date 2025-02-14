const express = require('express')
const { handleImageUpload, addNewProduct, fetchAllProducts, editNewProducts, deleteProduct } = require('../../controllers/admin/admin-products-controller')
const { upload } = require('../../helpers/cloudinary')
const router = express.Router()


router.post('/uploadImage', upload.single("Image_file"), handleImageUpload)
router.post('/addProduct', addNewProduct)
router.post('/fetchallproducts', fetchAllProducts)
router.post('/deleteproduct/:id', deleteProduct)
router.post('/editproduct/:id', editNewProducts)

module.exports = router