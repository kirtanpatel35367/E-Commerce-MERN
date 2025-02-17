import { useEffect } from "react";
import { Card, CardContent, CardFooter } from "../ui/card"

const FetchAdminProducts = ({ product, formData, setFormData, currentEditedId, setCurrentEditedId, setOpenProductDialoge,setIsEditMode,handleDeleteProduct,isFormValid }) => {
    return (
        <Card className="w-full max-w-lg mx-auto border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out bg-white">
            <div>
                <div className="relative overflow-hidden rounded-t-lg">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[250px] object-cover cursor-pointer rounded-t-lg hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <CardContent className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900">{product?.title}</h2>
                    <div className="mt-2">
                        <span className={`text-lg font-semibold ${product?.salePrice > 0 ? 'line-through text-gray-500' : 'text-primary'}`}>₹
                            {product?.price}
                        </span>
                        {product?.salePrice > 0 && (
                            <span className="ml-2 text-lg font-bold ">
                                ₹{product?.salePrice}
                            </span>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex sm:flex-row gap-2 p-4">
                    <button
                        onClick={() => {
                            setOpenProductDialoge(true);
                            setCurrentEditedId(product._id);
                            setFormData(product);
                            setIsEditMode(true)
                          }}
                        className="w-full max-w-[180px] sm:max-w-none sm:w-auto px-3 py-1.5 rounded-md bg-slate-800 text-white text-sm font-medium transition-all"
                    >
                        Edit
                    </button>
                    <button  onClick={()=>{
                        handleDeleteProduct(product?._id)
                    }} className="w-full max-w-[180px] sm:max-w-none sm:w-auto px-3 py-1.5 rounded-md bg-slate-800 text-white text-sm font-medium  transition-all">
                        Delete
                    </button>
                </CardFooter>

            </div>
        </Card>
    )
}

export default FetchAdminProducts
