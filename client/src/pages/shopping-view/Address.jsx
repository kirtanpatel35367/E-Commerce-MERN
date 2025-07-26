import CommonForm from "@/components/common/Form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addressFormControls } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { addnewAddress, deleteAddress, editAddress, fetchAddresses } from "@/store/shop/address-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddressCard from "./Address-Card"
import { useForm } from "react-hook-form"

function Address({ setCurrentSelectedAddress, currentSelectedAdddress }) {

    const { register, control, handleSubmit, watch, setValue, reset, getValues } = useForm()


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




    function onSubmit(data) {
        // e.preventDefault()

        //Set Maximum Address
        if (AddressList?.length >= 3 && currentEditedId == nul) {
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
                formData: data
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
                ...data,
                userId: user?.id
            })).then((data) => {
                if (data?.payload?.success) {
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
        console.log(address)
        setFormData({
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
        reset(formData)
    }, [dispatch, formData])


    return (
        <Card >
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
                {
                    AddressList && AddressList.length > 0 ? AddressList.map((address) =>
                        <AddressCard key={address._id} currentSelectedAdddress={currentSelectedAdddress} setCurrentSelectedAddress={setCurrentSelectedAddress} address={address} handleEditAddress={handleEditAddress} handleDeleteAddress={handleDeleteAddress} />
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

                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <label htmlFor="address" className="text-sm font-medium">Address</label>
                            <input

                                placeholder="Enter Address"
                                type="text"
                                {...register("address")}
                                onChange={(e) => setValue("address", e.target.value)}
                                className="mt-1 p-2 border rounded-md  focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="city" className="text-sm font-medium">City</label>
                            <input

                                placeholder="Enter city"
                                type="text"
                                {...register("city")}
                                onChange={(e) => setValue("city", e.target.value)}
                                className="mt-1 p-2 border rounded-md  focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                            <input type="number"
                                placeholder="Enter Phone Number"
                                {...register("phone")}
                                onChange={(e) => setValue("phone", e.target.value)}
                                className="mt-1 p-2 border rounded-md  focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="pincode" className="text-sm font-medium">PinCode</label>
                            <input type="number"
                                placeholder="Enter Pin Code"
                                {...register("pincode")}
                                onChange={(e) => setValue("pincode", e.target.value)}
                                className="mt-1 p-2 border rounded-md  focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                            <textarea type="text"
                                placeholder="Enter Notes"
                                {...register("notes")}
                                onChange={(e) => setValue("notes", e.target.value)}
                                className="mt-1 p-2 border rounded-md  focus:outline-none"
                            />
                        </div>

                        <button
                            className="bg-[#0e1e49] text-white rounded-md px-4 py-2 cursor-pointer hover:bg-[#1e2754ea] transition-all duration-300"
                            type="submit"
                        >
                            Add New Address
                        </button>

                    </div>

                </form>



                {/* <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttontext={currentEditedId != null ? "Edit Address" : "Add Address"} onsubmit={(e) => handleSubmit(e)} isButtonDisabled={!isFormValid()} /> */}
            </CardContent>
        </Card>
    )
}

export default Address