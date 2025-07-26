const Joi = require("joi")
const Address = require("../../models/Address")


//Add Address in User Account
const addAddress = async (req, res) => {
    try {

        const newAddressSchema = Joi.object({
            userId: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).required(),
            phone: Joi.string().pattern(/^[1-9][0-9]{9}$/).required(),
            notes: Joi.string().required()
        })


        const { error, value } = newAddressSchema.validate(req.body)


        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { userId, address, city, pincode, phone, notes } = value

        const newAddress = new Address({ userId, address, city, pincode, phone, notes })

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

    const fetchAddressSchema = Joi.object({
        userId: Joi.string().required()
    })

    const { error, value } = fetchAddressSchema.validate(req.params)

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    const { userId } = value

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

        const EditAddressSchema = Joi.object({
            userId: Joi.string().required(),
            addressId: Joi.string().required()
        })

        const { error, value } = EditAddressSchema.validate(req.params)

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { userId, addressId } = value


        //Getting Data From Body
        const formData = req.body


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
        const DeleteAddressSchema = Joi.object({
            userId: Joi.string().required(),
            addressId: Joi.string().required()
        });

        const { error, value } = DeleteAddressSchema.validate(req.params);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { userId, addressId } = value;


        const address = await Address.findOneAndDelete({ _id: addressId, userId });


        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully",
            data: address
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while deleting address"
        });
    }
};


module.exports = { addAddress, editAddress, deleteAddress, fetchAllAddress }