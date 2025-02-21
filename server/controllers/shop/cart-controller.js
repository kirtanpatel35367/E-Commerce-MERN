const Cart = require('../../models/Cart')
const Product = require('../../models/Products')

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Data is Not Given"
            })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(400).json({
                success: true,
                message: "Given ProductId is Not Found"
            })
        }

        let cart = await Cart.findOne({ userId })

        if (!cart) {
            cart = new Cart({
                userId, items: []
            })
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)

        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity })
        }
        else {
            cart.items[findCurrentProductIndex].quantity += quantity
        }


        await cart.save()

        res.status(200).json({
            success: true,
            message: "Product Add Succesfully",
            data: {
                ...cart._doc
            }
        })


    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Faild To Add In Cart"
        })
    }
}

const fetchCartItems = async (req, res) => {
    try {

        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "UserId is Not Provided"
            })
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: "image title price salePrice totalStock"
        })


        if (!cart) {
            return res.status(400).json({
                success: false,
                message: "Cart is Not Found"
            })
        }

        const validItems = cart.items.filter(product => product.productId) //For Validation that Product Id is Not Null

        if (validItems.length < cart.items.length) {
            cart.items = validItems
            await cart.save()   //Saving Cart Details with Population Method
        }


        const populateCartItems = validItems.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product Not Found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }))


        res.status(200).json({
            success: true,
            message: "Cart Fetched Succesfully",
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })


    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Cart is Not Fetched"
        })
    }
}

const deleteCartItem = async (req, res) => {
    try {

        const { userId, productId } = req.params

        if (!userId || !productId) {
            return res.status(404).json({
                success: false,
                message: "UserId and ProductId is Not Provided"
            })
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: "image title price salePrice totalStock"
        })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId)

        await cart.save()

        await cart.populate({
            path: 'items.productId',
            select: "image title price salePrice totalStock"
        })


        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product Not Found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }))


        res.status(200).json({
            success: true,
            message: "Product Deleted Succesfully",
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })




    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error While Delete From Cart"
        })
    }
}



const updateCartItemQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Data is Not Given"
            })
        }

        const cart = await Cart.findOne({ userId })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is Not Found"
            })
        }

        const findCurrentProductIndex = cart.items.findIndex(productItem => productItem.productId.toString() === productId)

        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Given ProductId Product is Not Found"
            })
        }

        cart.items[findCurrentProductIndex].quantity = quantity

        await cart.save() //Saving Cart withh Updated Quantity

        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })


        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId.image ? item.productId.image : null,
            title: item.productId.title ? item.productId.title : null,
            price: item.productId.price ? item.productId.price : null,
            salePrice: item.productId.salePrice ? item.productId.salePrice : null,
            quantity: item.quantity,
        }))


        res.status(200).json({
            success: true,
            message: "Cart Fetched Succesfully",
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })



    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Error While Updating Item and Quantity"
        })
    }
}

module.exports = { addToCart, fetchCartItems, updateCartItemQuantity, deleteCartItem }