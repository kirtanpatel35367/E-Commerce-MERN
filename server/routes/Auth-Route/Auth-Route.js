const express = require('express')
const { UserRegister, UserLogin, Userlogout, authMiddleware } = require('../../controllers/auth/Auth-Controller')
const router = express.Router()

router.post('/register', UserRegister)
router.post('/login', UserLogin)
router.post('/logout', Userlogout)
router.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user
    res.status(200).json({
        sucess: true,
        message: "Authorised User",
        user
    })
})

module.exports = router