import CommonForm from '@/components/common/Form'
import { LoginFormControl } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Authlogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { register, control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })


  const [formData, setFormData] = useState({})

  function onSubmit(formData) {

    setFormData(formData)
    dispatch(loginUser(formData)).then((data) => {    //Data is Payload what API Responce and Also Meta Data in This Form Data
      if (data?.payload?.success) {
        toast({
          title: data.payload.message,
          variant: "success"
        })
      }
      else {
        toast({
          title: data.payload.message,
          variant: "destructive"
        })
      }
    })
  }




  return (
    <div className='mx-auto w-full max-w-md space-y-10'>
      <div className='text-center'>
        <h1 className='font-bold text-3xl font-HeadFont'>Welcome, User</h1>
        <p className='font-HeadFont text-sm'>New User? <Link to={'/auth/register'} >Create Your Account</Link></p>
      </div>

      <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto p-6 border rounded-lg">
        <div className="flex flex-col gap-4 font-HeadFont">


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
                required: {
                  value: true,
                  message: "Password is Required"
                },
                // minLength: { value: 8, message: "Atlest 8 Character is Required" },
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
            Log In
          </button>
        </div>
      </form>

      {/* <CommonForm formControls={LoginFormControl} formData={formData} setFormData={setFormData} buttontext="Log In" onsubmit={onsubmit} /> */}
    </div>
  )
}

export default Authlogin
