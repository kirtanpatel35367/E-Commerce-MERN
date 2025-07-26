import { Controller, useForm } from "react-hook-form"
import { DialogContent, DialogTitle } from "../ui/dialog"
import { Separator } from "../ui/separator"
import Select from 'react-select'

function shoppingOrderDetails() {
    const { register, handleSubmit, watch, control } = useForm()
    function onSubmit(data) {
        console.log(data)
    }

    return (
        <DialogContent className='sm:max-w-[600px]' >
            <DialogTitle>Order Details</DialogTitle>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-4 items-center justify-between">
                        <p className="font-medium">Order ID</p>
                        <label>123456</label>
                    </div>
                    <div className="flex mt-4 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <label>27/08/2025</label>
                    </div>
                    <div className="flex mt-4 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <label>5000</label>
                    </div>
                    <div className="flex mt-4 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <label>In Progress</label>
                    </div>
                    <Separator />
                    <div className="grid gap-2">
                        <p className="font-medium">Order Details</p>
                        <div className="grid gap-3">
                            <li className="flex mt-4 items-center justify-between">
                                <span>Product 1</span>
                                <span>500</span>
                            </li>
                        </div>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-6">
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>User 1</span>
                            <span>Address</span>
                            <span>City</span>
                            <span>pinCode</span>
                            <span>Phone</span>
                            <span>Notes</span>
                        </div>
                    </div>
                </div>
                {/* <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <label htmlFor="orderstatus" className="mb-3">Order Status</label>
                        <Controller
                            name="orderstatus"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    menuPlacement="top"
                                    {...field}
                                    value={field.value ? { value: field.value, label: field.value } : null}
                                    options={[
                                        { value: "pending", label: "Pending" },
                                        { value: "inprocess", label: "In Progress" },
                                        { value: "inshipping", label: "In Shipping" },
                                        { value: "rejected", label: "Rejected" },
                                        { value: "delivered", label: "Delivered" }
                                    ]}
                                    onChange={(selectedOption) => field.onChange(selectedOption?.label)}
                                />
                            )}
                        />
                        <button
                            className="bg-[#0e1e49] text-white rounded-md px-4 py-2 mt-2 cursor-pointer hover:bg-[#1e2754ea] transition-all duration-300"
                            type="submit"
                        >Update Order Status</button>

                    </div>
                </form> */}
            </div>
        </DialogContent>
    )
}

export default shoppingOrderDetails