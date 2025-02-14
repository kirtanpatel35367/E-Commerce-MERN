const express = require('express')
const { handleImageUpload, addNewProduct, fetchAllProducts, editNewProducts, deleteProduct } = require('../../controllers/admin/admin-products-controller')
const { upload } = require('../../helpers/cloudinary')
const router = express.Router()


router.post('/uploadImage', upload.single("Image_file"), handleImageUpload)
router.post('/addProduct', addNewProduct)
router.put('/editproduct/:id', editNewProducts)
router.delete('/deleteproduct/:id', deleteProduct)
router.get('/fetchallproducts', fetchAllProducts)

module.exports = router