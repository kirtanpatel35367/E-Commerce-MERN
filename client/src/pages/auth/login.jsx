import CommonForm from '@/components/common/Form'
import { LoginFormControl } from '@/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Authlogin = () => {
  const initialstate = {
    email: "",
    password: "",
  }

  const [formData, setFormData] = useState(initialstate)

  function onsubmit() {

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
