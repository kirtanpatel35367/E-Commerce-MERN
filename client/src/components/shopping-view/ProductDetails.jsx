import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { FaStar } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { useDispatch } from "react-redux";
import { setProductDetails } from "@/store/product-slice";

function ProductDetailsDialog({ open, setOpen, productDetails, handleAddtoCart }) {

    const dispatch = useDispatch()

    function handleOpenCart() {
        setOpen(close)
        dispatch(setProductDetails())
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenCart}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12  max-w-[90vw] sm:max-w-[80vw] lg:max-w-[50vw] font-HeadFont ">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={300}
                        height={300}
                        className="object-cover w-full"
                    />
                </div>

                <DialogTitle className="text-2xl font-bold flex-col items-center justify-center">
                    {productDetails?.title}
                    <div className="grid gap-2">
                        <p className={`${productDetails?.salePrice > 0 ? 'line-through' : ''} text-lg font-medium`}>Price: ${productDetails?.price}</p>
                        <p className="text-lg font-medium">Sale Price: ${productDetails?.salePrice}</p>
                        <Button onClick={() => handleAddtoCart(productDetails?._id)} >Add To Cart</Button>
                        <Separator />
                        <div>
                            <p className="text-base font-HeadFont mb-4">Reviews</p>
                            <div className="grid gap-6 overflow-y-scroll">
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarFallback className='text-base font-HeadFont' >KP</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <div className="flex items-center">
                                            <h3 className="text-base">Kirtan Patel</h3>
                                        </div>
                                        <div className="flex gap-0.5">
                                            <FaStar className="text-amber-300" />
                                            <FaStar className="text-amber-300" /><FaStar className="text-amber-300" /><FaStar className="text-amber-300" /><FaStar className="text-amber-300" />
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground text-sm">Good Product</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarFallback className='text-base font-HeadFont' >KP</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <div className="flex items-center">
                                            <h3 className="text-base">Kirtan Patel</h3>
                                        </div>
                                        <div className="flex gap-0.5">
                                            <FaStar className="text-amber-300" />
                                            <FaStar className="text-amber-300" /><FaStar className="text-amber-300" /><FaStar className="text-amber-300" /><FaStar className="text-amber-300" />
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground text-sm">Good Product</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarFallback className='text-base font-HeadFont' >KP</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <div className="flex items-center">
                                            <h3 className="text-base">Kirtan Patel</h3>
                                        </div>
                                        <div className="flex gap-0.5">
                                            <FaStar className="text-amber-300" />
                                            <FaStar className="text-amber-300" /><FaStar className="text-amber-300" /><FaStar className="text-amber-300" /><FaStar className="text-amber-300" />
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground text-sm">Good Product</span>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </DialogTitle>

                <div className="flex items-center justify-center">
                    {productDetails?.description}
                </div>




            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;
