const Product = require('../../models/Products')

const getFilteredProducts = async (req, res) => {
    try {

        const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.params


        let filters = {}

        if (category.length) {
            filters.category = { $in: category.split(',') }
        }

        if (brand.length) {
            filters.brand = { $in: brand.split(',') }
        }

        let sort = {}


        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price = 1
                break;
            case 'price-hightolow':
                sort.price = -1
            case 'title-atoz':
                sort.price = 1
            case 'title-ztoa':
                sort.price = -1
        }

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

module.exports = { getFilteredProducts }