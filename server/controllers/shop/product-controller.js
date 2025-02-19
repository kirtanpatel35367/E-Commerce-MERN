const Product = require('../../models/Products')

const getFilteredProducts = async (req, res) => {
    try {

        const { Category = [], Brand = [], sortBy = "price-lowtohigh" } = req.query


        let filters = {}

        if (Category.length) {
            filters.category = { $in: Category.split(',') }
        }

        if (Brand.length) {
            filters.brand = { $in: Brand.split(',') }
        }

        let sort = {}


        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price = 1
                break;
            case 'price-hightolow':
                sort.price = -1
                break;
            case 'title-atoz':
                sort.title = 1
                break;
            case 'title-ztoa':
                sort.title = -1
                break;
            default:
                sort.price = 1
        }

        const products = await Product.find(filters).sort(sort)

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



const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id)

        if (!product) return res.status(404).json({
            success: false,
            message: "Not Valid Product Id"
        })

        return res.status(200).json({
            success: true,
            messsage: "Product Fetched Succesfully",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Product is Fetched"
        })
    }
}

module.exports = { getFilteredProducts, getProductDetails }