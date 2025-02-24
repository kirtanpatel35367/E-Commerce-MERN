const Address = require("../../models/Address")


//Add Address in User Account
const addAddress = async (req, res) => {
    try {

        const { userId, address, city, pincode, phone, notes } = req.body

        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(404).json({
                success: false,
                message: "Address Data is Not Provided"
            })
        }

        const newAddress = new Address({
            userId,
            address,
            city,
            pincode,
            phone,
            notes
        })

        await newAddress.save()

        return res.status(200).json({
            success: true,
            message: "Address Added Succesfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while Adding Provided"
        })
    }
}


//Fetch AlLAddress from Address Db
const fetchAllAddress = async (req, res) => {
    const { userId } = req.params

    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "UserId Not Provided while Adding Address"
        })
    }

    const userAddresses = await Address.find({ userId })

    return res.status(200).json({
        success: true,
        message: "Address Fetched Succesfully",
        data: userAddresses
    })
}

//Edit Address
const editAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params
        const formData = req.body

        if (!userId || !addressId) {
            res.status(404).json({
                success: false,
                message: "Userid or AddressId Is not Found while Adding Address"
            })
        }

        const address = await Address.findOneAndUpdate({
            _id: addressId,
            userId
        },
            formData, {
            new: true
        }
        )

        // await address.save()

        return res.status(200).json({
            success: true,
            message: "Address Edited",
            data: address
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Address is Not Edit",
        })
    }
}


//Delete Address
const deleteAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params

        if (!userId || !addressId) {
            return res.status(404).json({
                success: false,
                message: "Userid or AddressId Is not Found while Adding Address"
            })
        }


        const address = await Address.findOneAndDelete({ _id: addressId, userId })

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address is Not Found"
            })
        }


        return res.status(200).json({
            success: true,
            message: "Address Deleted Succesfully",
            data: address
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Address is Not Deleted"
        })
    }
}

module.exports = { addAddress, editAddress, deleteAddress, fetchAllAddress }