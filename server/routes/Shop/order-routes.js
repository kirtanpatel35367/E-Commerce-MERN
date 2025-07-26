const express = require("express")
const { createOrder, capturePayment } = require("../../controllers/shop/order-controller")
const webhook = require("../../controllers/shop/webHook-controller")
const router = express.Router()

router.post("/create-checkout-session", createOrder)
router.get("/capturepayment", capturePayment)
router.post("/webhook", express.raw({ type: 'application/json' }), webhook)

module.exports = router