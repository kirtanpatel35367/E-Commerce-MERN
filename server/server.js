const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const AuthRouter = require('./routes/Auth-Route/Auth-Route')
const AdminProductRouter = require('./routes/admin/AdminProductRoute')
const app = express()


//CORS
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pregma"],
        credentials: true,
    })
);

//Middlereware FUnctions for Cookie Parsing and JSON Data ParSing
app.use(cookieParser())
app.use(express.json())


//MongoDb Connection
mongoose.connect('mongodb+srv://kp534422:Kap8537@cluster0.f0jke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("MongoDb Connected Succesfully"))
    .catch((error) => console.log(`Error While Connecting to MongoDb`, error))


//Auth Middleware
app.use('/api/auth', AuthRouter)
app.use('/api/admin/products',AdminProductRouter)


const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
    console.log(`server is Running on ${PORT}`)
})