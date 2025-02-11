const express = require('express')
const { UserRegister } = require('../../controllers/auth/Auth-Controller')
const router = express.Router()

router.post('/register', UserRegister)


module.exports = router