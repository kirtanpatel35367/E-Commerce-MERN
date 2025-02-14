const cloudinary = require('cloudinary').v2
const multer = require('multer')


cloudinary.config({
    cloud_name: "dxpkrj63r",
    api_key: "382732374386379",
    api_secret: "sFZXOYE1XMaj4vFAAIEeetcXaJY",
})

const storage = new multer.memoryStorage()

async function imageUploadUtils(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    })

    return result
}

const upload = multer({ storage })

module.exports = { upload, imageUploadUtils }