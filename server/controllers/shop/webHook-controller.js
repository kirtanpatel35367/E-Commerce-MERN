require('dotenv').config();

const Order = require("../../models/Order");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// let endpointSecret = STRIPE_END_POINT_SCREAT_KEY;
let session = ""

const webhook = async (request, response) => {

    const event = request.body;

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session_completed = event.data.object;
                console.log("Checkout Session completed:", session_completed);

                const orderId = session_completed.metadata?.orderId

                if (!orderId) return res.status(500).json({
                    success: false,
                    message: "Order Id Not Found"
                })

                await Order.findByIdAndUpdate(orderId, {
                    paymentStatus: session_completed?.payment_status,
                    orderStatus: "confirmed"
                }, { new: true })


                break;
            }

            case 'checkout.session.async_payment_succeeded': {
                const payment_succeeded = event.data.object;
                console.log("Payment succeeded:", payment_succeeded);
                break;
            }


            case 'checkout.session.async_payment_failed': {
                const payment_failed = event.data.object;
                console.log("payment Failed", payment_failed);
                break;
            }


            case 'checkout.session.expired': {
                const session_expired = event.data.object;
                console.log("Payment session expired:", session_expired);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        response.json({ received: true });

    } catch (error) {
        console.error("Error handling the webhook event:", error);
        response.status(400).json({
            success: false,
            error: `Error handling the event: ${error.message}`,
        });
    }
};



module.exports = webhook 