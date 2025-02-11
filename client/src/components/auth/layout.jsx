import { Outlet } from "react-router-dom";
import LogInImage from '../../assets/LogInImage.png'

function AuthLayout() {
    return (
        <div className="flex min-h-screen w-full">
            <div className="hidden font-HeadFont lg:flex items-center justify-center  w-1/2 px-12">
                <div className="max-w-md space-y-6 text-center text-primary-foreground">
                    {/* <h1 className="text-4xl font-extrabold tracking-tighter ">Welcome to E-commerce Shopping</h1> */}
                    <img className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-full lg:h-full" src={LogInImage} alt="" />
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center  bg-background px-4 py-12 sm:px-6 lg:px-8">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout