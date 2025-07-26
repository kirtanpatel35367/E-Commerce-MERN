require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const AuthRouter = require('./routes/Auth-Route/Auth-Route')
const AdminProductRouter = require('./routes/admin/AdminProductRoute')
const ShopProductRouter = require('./routes/Shop/shop-routes')
const CartRouter = require('./routes/Shop/cart-routes')
const AddressRouter = require('./routes/Shop/address-routes')
const OrderRouter = require('./routes/Shop/order-routes')
const app = express()



//CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://ezbuy-client.onrender.com', // ✅ Replace with your actual Vercel domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
  })
);

//Middlereware FUnctions for Cookie Parsing and JSON Data ParSing
app.use(cookieParser())
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send("Hello")
})

//MongoDb Connection
mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log("MongoDb Connected Succesfully"))
    .catch((error) => console.log(`Error While Connecting to MongoDb`, error))


//Auth Middleware
app.use('/api/auth', AuthRouter)
app.use('/api/admin/products', AdminProductRouter)
app.use('/api/shop/products', ShopProductRouter)
app.use('/api/shop/cart', CartRouter)
app.use('/api/shop/address', AddressRouter)
app.use('/api/shop/order', OrderRouter)



const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
    console.log(`server is Running on ${PORT}`)
})