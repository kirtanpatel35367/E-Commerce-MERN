import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function AddressCard({ address, handleEditAddress, handleDeleteAddress, setCurrentSelectedAddress, currentSelectedAdddress }) {

    return (
        <Card onClick={() => setCurrentSelectedAddress ? setCurrentSelectedAddress(address) : null} className={`flex flex-col  justify-center ${currentSelectedAdddress?._id == address._id ? 'border-red-500' : ""}`}>
            <CardContent className="grid gap-4 p-3 cursor-pointer">
                <Label>{address?.address}</Label>
                <Label>{address?.city}</Label>
                <Label>{address?.phone}</Label>
                <Label>{address?.pincode}</Label>
                <Label>{address?.notes}</Label>
            </CardContent>
            <CardFooter className='flex justify-between gap-2 '>
                <button onClick={() => handleEditAddress(address)} className='bg-[#682c0d] text-white py-1 px-5 rounded-md font-HeadFont cursor-pointer sm:px-2 sm:text-xs'>Edit</button>
                <button onClick={() => handleDeleteAddress(address._id)} className='bg-[#682c0d] text-white py-1 px-5 rounded-md font-HeadFont cursor-pointer sm:px-2 sm:text-xs'>Delete</button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard