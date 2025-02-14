import CommonForm from '@/components/common/Form'
import { LoginFormControl } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Authlogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  const initialstate = {
    email: "",
    password: "",
  }

  const [formData, setFormData] = useState(initialstate)

  function onsubmit(event) {
    event.preventDefault()

    dispatch(loginUser(formData)).then((data) => {    //Data is Payload what API Responce and Also Meta Data in This Form Data
      if (data?.payload.sucess) {
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
      <CommonForm formControls={LoginFormControl} formData={formData} setFormData={setFormData} buttontext="Log In" onsubmit={onsubmit} />
    </div>
  )
}

export default Authlogin
