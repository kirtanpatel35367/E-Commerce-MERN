import { Button } from "../ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import UserCartConatainer from "./cart-items-container"

function UserCartItemWrapper({ cartItems }) {

    let Totalcost = cartItems.reduce((acc, cartItem) => acc + (cartItem.salePrice > 0 ? cartItem.salePrice*cartItem.quantity : cartItem.price*cartItem.quantity ), 0)

    return <SheetContent className='sm:max-w-sm font-HeadFont overflow-y-auto'>
        <SheetHeader>
            <SheetTitle>
                <span className="flex font-semibold">Your Cart</span>
            </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-5">
            {
                cartItems && cartItems.length > 0 ? cartItems.map((cartItem) =>
                    <UserCartConatainer key={cartItem.productId} cartItem={cartItem} />
                ) : <></>
            }
        </div>
        <div className="mt-8 space-y-5">
            <div className="flex justify-between">
                <span className="font-bold">Total Amount</span>
                <span className="font-bold">₹{Totalcost}</span>
            </div>
            <Button className='w-full hover:bg-slate-700' >CheckOut</Button>
        </div>
    </SheetContent>
}

export default UserCartItemWrapper