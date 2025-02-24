import CommonForm from "@/components/common/Form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addressFormControls } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { addnewAddress, deleteAddress, editAddress, fetchAddresses } from "@/store/shop/address-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddressCard from "./Address-Card"

function Address() {
    const initialState = {
        address: "",
        city: "",
        phone: "",
        pincode: "",
        notes: ""
    }

    const dispatch = useDispatch()
    const [formData, setFormData] = useState(initialState)
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const { user } = useSelector(state => state.auth)
    const { AddressList } = useSelector(state => state.addressCart)
    const { toast } = useToast()


    
    function handleSubmit(e) {
        e.preventDefault()

        //Set Maximum Address
        if (AddressList?.length >= 3 && currentEditedId==nul) {
            setFormData(initialState)
            toast({
                title: "You Can Add Maximum 2 Address",
                varient: 'destructive'
            })
            return
        }

        if (currentEditedId != null) {
            dispatch(editAddress({
                userId: user.id,
                addressId: currentEditedId,
                formData
            })).then((data) => {
                if (data?.payload.success) {
                    dispatch(fetchAddresses(user?.id))
                    toast({
                        title: data.payload.message || "Addrress Edited Succesfully",
                    })
                    setFormData(initialState)
                    setCurrentEditedId(null)
                }
            })
        }

        else {
            dispatch(addnewAddress({
                ...formData,
                userId: user?.id
            })).then((data) => {
                if (data?.payload.success) {
                    dispatch(fetchAddresses(user?.id))
                    toast({
                        title: data.payload.message || "Addrress Added Succesfully",
                    })
                    setFormData(initialState)
                }
            })
        }
    }


    function handleEditAddress(address) {
        setCurrentEditedId(address._id)
        setFormData({
            ...formData,
            address: address.address,
            city: address.city,
            phone: address.phone,
            pincode: address.pincode,
            notes: address.notes
        })
    }


    function handleDeleteAddress(addressId) {
        console.log(addressId)
        dispatch(deleteAddress({ userId: user?.id, addressId })).then((data) => {
            if (data.payload.success) {
                dispatch(fetchAddresses(user?.id))
                toast({
                    title: data.payload.message || "Addrress Deleted Succesfully",
                })
            }
        })
    }


    function isFormValid() {
        return Object.keys(formData)
            .map(key => formData[key].trim() != '')
            .every(item => item)
    }


    useEffect(() => {
        dispatch(fetchAddresses(user?.id))
    }, [dispatch])




    return (
        <Card >
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
                {
                    AddressList && AddressList.length > 0 ? AddressList.map((address) =>
                        <AddressCard key={address._id} address={address} handleEditAddress={handleEditAddress} handleDeleteAddress={handleDeleteAddress} />
                    ) : <></>
                }
            </div>
            <CardHeader>
                <CardTitle>
                    {
                        currentEditedId != null ? <p>Edit Your Address</p> : <p>Add New Address</p>
                    }
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttontext={currentEditedId != null ? "Edit Address" : "Add Address"} onsubmit={(e) => handleSubmit(e)} isButtonDisabled={!isFormValid()} />
            </CardContent>
        </Card>
    )
}

export default Address