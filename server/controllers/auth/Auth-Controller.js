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
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username, email, password
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

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: 'User Login Failed'
        })
    }
}


//LogOut


//Auth Middleware

module.exports = { UserRegister }