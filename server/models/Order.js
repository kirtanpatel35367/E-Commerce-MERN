const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: String,
    cartItems: [
        {
            productId: String,
            title: String,
            image: String,
            price: Number,
            salePrice: Number,
            quantity: Number
        }
    ],

    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String
    },

    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: String,
    orderUpdateDate: String,
})

module.exports = mongoose.model('Order', OrderSchema)