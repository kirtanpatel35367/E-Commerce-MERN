const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

//Register For New User
const UserRegister = async (req, res) => {

    const { username, email, password } = req.body;

    console.log(req.body)

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        const checkUser = await User.findOne({ email })
        if (checkUser) return res.json({ sucess: false, message: "Email Already Exits Try with Alternate Email" })

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, email, password: hashPassword
        })

        await newUser.save()
        res.status(200).json({
            sucess: true,
            message: 'User Register Succesfully'
        })


    } catch (error) {
        console.log("Error while Create New User", error)
        res.status(500).json({
            sucess: false,
            message: 'New User Registration Failed'
        })
    }
}


//Login

const UserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email })
        if (!checkUser) return res.json({ sucess: false, message: "User With This Email is Not Exits, Create New Account first!" })

        
        const checkPassword = await bcrypt.compare(password, checkUser.password)
        if (!checkPassword) return res.json({ sucess: false, message: "Enter Valid Password", data: checkPassword })

        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
        }, 'CLIENT_SECRET_KEY', { expiresIn: '60m' })

        res.cookie('jwtToken', token, {
            httpOnly: true,
            secure: false
        }).json({
            sucess: true,
            message: "User Logged In SuccesFully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id
            }
        })

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: 'User Login Failed'
        })
    }
}


//Auth Middleware

const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (!token) return res.status(401).json({
        sucess: false,
        message: "UnAuthorised User"
    })

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded
        next()

    } catch (error) {
        res.status(401).json({
            sucess: false,
            message: "UnAuthorised User"
        })
    }
}


//LogOut

const Userlogout = (req, res) => {

    res.clearCookie('jwtToken').json({
        sucess: true,
        message: "User Logged Out Sucessfully"
    })
}


//Auth Middleware

module.exports = { UserRegister, UserLogin, Userlogout, authMiddleware }