import CommonForm from '@/components/common/Form'
import { registerFormControl } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Authregister = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { toast } = useToast()

    //Setting Form Data 
    const [formData, setFormData] = useState({})

    const onSubmit = (formData) => {
        setFormData(formData)
        dispatch(registerUser(formData)).then((data) => {  //Data Returned From API
            if (data?.payload?.success) {
                navigate('/auth/login')
                toast({
                    title: data?.payload.message,
                })
            }
            else {
                toast({
                    title: data?.payload.message
                })
            }
        }
        )
    }

    //UseReact Hook Forms
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })





    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='font-bold text-3xl font-HeadFont'>Create New Account </h1>
                <p className='  '>Already Have Account? <Link to={'/auth/login'} >Log In</Link> </p>
            </div>

            <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto p-6 border rounded-lg ">
                <div className="flex flex-col gap-4 font-HeadFont">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-sm font-medium">User Name</label>
                        <input
                            placeholder="Enter UserName"
                            type="text"
                            {...register("username", {
                                required: { value: true, message: "Username is Required" },
                                pattern: { value: /^ [a - zA - Z0 - 9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6, 18}[a-zA-Z0-9]$/, message: "Invalid Username" }
                            })}
                            className="mt-1 p-2 border rounded-md  focus:outline-none"
                        />
                        {
                            errors.username && <span className='text-red-600 text-sm mt-1'>{errors.username.message}</span>
                        }
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input
                            placeholder="Enter Email"
                            type="text"
                            {...register("email", {
                                required: { value: true, message: "Email is Required" },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalied Email"
                                },
                            })}
                            className="mt-1 p-2 border rounded-md  focus:outline-none"
                        />
                        {
                            errors.email && <span className='text-red-600 text-sm mt-1'>{errors.email.message}</span>
                        }
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <input
                            placeholder="Enter Password"
                            type="password"
                            {...register("password", {
                                required: { value: true, message: "Password is Required" },
                                pattern: { value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, message: "Invalid Password" }
                            })}
                            className="mt-1 p-2 border rounded-md  focus:outline-none"
                        />
                        {
                            errors.password && <span className='text-red-600 text-sm mt-1'>{errors.password.message}</span>
                        }
                    </div>
                    <button
                        className="bg-[#682c0d] text-white rounded-md px-4 py-2 cursor-pointer hover:bg-[#682b0dea] transition-all duration-300"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>

            {/* <CommonForm formControls={registerFormControl} formData={formData} setFormData={setFormData} buttontext="Sign Up" onsubmit={onsubmit} /> */}
        </div>
    )
}

export default Authregister
