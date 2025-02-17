const Product = require('../../models/Products')

const getFilteredProducts = async (req, res) => {
    try {
        const products = await Product.find({})

        res.status(200).json({
            success: true,
            message: "Product Fetched Succesfully",
            data: products
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Product is Fetched"
        })
    }
}

module.exports = {getFilteredProducts}