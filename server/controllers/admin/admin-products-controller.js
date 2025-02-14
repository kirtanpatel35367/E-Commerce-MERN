const { imageUploadUtils } = require("../../helpers/cloudinary")
const Product = require('../../models/Products')


//Image Upload To Cloudinary
const handleImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                sucess: false,
                message: "No file uploaded!"
            });
        }

        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = `data:${req.file.mimetype};base64,${b64}`
        const result = await imageUploadUtils(url)

        res.json({
            sucess: true,
            message: 'Image Uploded Succesfully',
            result
        })

    } catch (error) {
        console.log('error While Upload Image in Cloudinary', error)
        res.json({
            sucess: false,
            message: "Error While Uploading Image"
        })
    }
}

//Add New Product
const addNewProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body

        if (!image || !title || !description || !category || !brand || !price || !salePrice || !totalStock) return res.status(404).json({
            sucess: false,
            message: "Data is Not Provided"
        })

        const newCreatedProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        })

        await newCreatedProduct.save()
        res.status(200).json({
            sucess: true,
            message: "Product Added Successfully"
        })


    } catch (error) {
        console.log("Error While Add New Product", error)
        res.json({
            sucess: false,
            message: "Error While Add New Item",
            data: newCreatedProduct
        })
    }
}


//Fetch All Product 

const fetchAllProducts = async (req, res) => {
    try {
        const listOfAllProducts = await Product.find({})
        res.status(200).json({
            sucess: true,
            message: "Products Fetched Succesfully",
            data: listOfAllProducts
        })
    }
    catch (error) {
        console.log("Error While Fetch Product", error)
        res.json({
            sucess: false,
            message: "Error While Fetch Products"
        })
    }
}

//Edit  Product 

const editNewProducts = async (req, res) => {
    try {

        const { id } = req.params
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body

        const findProduct = await Product.findById(id)
        if (!findProduct) return res.json({
            sucess: false,
            message: "Product Not Found"
        })

        findProduct.title = title || findProduct.title,
            findProduct.description = description || findProduct.description,
            findProduct.category = category || findProduct.category,
            findProduct.brand = brand || findProduct.brand,
            findProduct.price = price || findProduct.price,
            findProduct.salePrice = salePrice || findProduct.salePrice,
            findProduct.totalStock = totalStock || findProduct.totalStock


        await findProduct.save()
        res.status(200).json({
            sucess: true,
            message: "Product Edited Succesfully",
            data: findProduct
        })


    } catch (error) {
        console.log("Error While Edit Product", error)
        res.json({
            sucess: false,
            message: "Error While Edit Products"
        })
    }
}

//Delete Product

const deleteProduct = async () => {
    try {

        const { id } = req.params

        const findProduct = await Product.findByIdAndDelete(id)

        if (!findProduct) return res.status(404).json({
            sucess: false,
            message: "Product is Not Available"
        })

        res.status(200).json({
            sucess: true,
            message: "Product Deleted Succesfully"
        })



    } catch (error) {
        console.log("Error While Delete Product", error)
        res.json({
            sucess: false,
            message: "Error While Delete Products"
        })
    }
}





module.exports = { handleImageUpload, addNewProduct, fetchAllProducts, editNewProducts, deleteProduct }