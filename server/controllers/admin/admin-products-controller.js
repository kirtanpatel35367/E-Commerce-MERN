const Joi = require("joi");
const { imageUploadUtils } = require("../../helpers/cloudinary")
const Product = require('../../models/Products')


//Image Upload To Cloudinary
const handleImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded!"
            });
        }

        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = `data:${req.file.mimetype};base64,${b64}`
        const result = await imageUploadUtils(url)

        res.json({
            success: true,
            message: 'Image Uploded Succesfully',
            result
        })

    } catch (error) {
        console.log('error While Upload Image in Cloudinary', error)
        res.json({
            success: false,
            message: "Error While Uploading Image"
        })
    }
}

//Add New Product
const addNewProduct = async (req, res) => {
    try {

        const NewProductSchema = Joi.object({
            image: Joi.required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            category: Joi.string().required(),
            brand: Joi.string().required(),
            price: Joi.number().positive().required(),
            salePrice: Joi.number().positive().required(),
            totalStock: Joi.number().positive().required()
        })

        // const { image, title, description, category, brand, price, salePrice, totalStock } = req.body

        const { error, value } = NewProductSchema.validate(req.body)

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }


        const { image, title, description, category, brand, price, salePrice, totalStock } = value

        if (!image || !title || !description || !category || !brand || !price || !salePrice || !totalStock) {
            return res.status(400).json({
                success: false,
                message: "Data is Not Provided"
            })
        }


        const newCreatedProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        })

        await newCreatedProduct.save()
        res.status(200).json({
            success: true,
            message: "Product Added Successfully"
        })


    } catch (error) {
        console.log("Error While Add New Product", error)
        res.json({
            success: false,
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
            success: true,
            message: "Products Fetched Succesfully",
            data: listOfAllProducts
        })
    }
    catch (error) {
        console.log("Error While Fetch Product", error)
        res.json({
            success: false,
            message: "Error While Fetch Products"
        })
    }
}

//Edit  Product 

const editNewProducts = async (req, res) => {
    try {

        const EditProductIdSchema = Joi.object({
            id: Joi.string().required(),
        })


        const EditProductSchema = Joi.object({
            image: Joi.string(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            category: Joi.string().required(),
            brand: Joi.string().required(),
            price: Joi.number().positive().required(),
            salePrice: Joi.number().positive().required(),
            totalStock: Joi.number().positive().required()
        })

        // const { id } = req.params
        // const { image, title, description, category, brand, price, salePrice, totalStock } = req.body

        const { error: paramsError, value: paramsvalue } = EditProductIdSchema.validate(req.params)
        const { error: bodyError, value: bodyValue } = EditProductSchema.validate(req.body)

        if (paramsError) {
            return res.status(400).json({
                success: false,
                message: paramsError.details[0].message
            });
        }

        if (bodyError) {
            return res.status(400).json({
                success: false,
                message: bodyError.details[0].message
            });
        }

        const { id } = paramsvalue
        const { title, description, category, brand, price, salePrice, totalStock } = bodyValue


        const findProduct = await Product.findById(id)

        console.log("product",findProduct)

        if (!findProduct) return res.json({
            success: false,
            message: "Product Not Found"
        })

        findProduct.title = title || findProduct.title,
            findProduct.description = description || findProduct.description,
            findProduct.category = category || findProduct.category,
            findProduct.brand = brand || findProduct.brand,
            findProduct.price = price === '' ? 0 : price || findProduct.price,
            findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice,
            findProduct.totalStock = totalStock || findProduct.totalStock


        await findProduct.save()
        res.status(200).json({
            success: true,
            message: "Product Edited Succesfully",
            data: findProduct
        })


    } catch (error) {
        console.log("Error While Edit Product", error)
        res.json({
            success: false,
            message: "Error While Edit Products"
        })
    }
}

//Delete Product

const deleteProduct = async (req, res) => {
    try {

        const DeleteProductSchema = Joi.object({
            id: Joi.string().required()
        })

        // const { id } = req.params;

        const { error, value } = DeleteProductSchema.validate(req.params)

        if (error) {
            return res.status(400).json({
                success: false,
                message: paramsError.details[0].message
            });
        }

        const { id } = value

        const findProduct = await Product.findById(id);

        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: findProduct,
        });

    } catch (error) {
        console.error("Error while deleting product:", error);

        return res.status(500).json({
            success: false,
            message: "Error while deleting product",
        });
    }
};






module.exports = { handleImageUpload, addNewProduct, fetchAllProducts, editNewProducts, deleteProduct }