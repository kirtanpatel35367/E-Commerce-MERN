import CommonForm from '@/components/common/Form'
import { registerFormControl } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { registerUser } from '@/store/auth-alice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Authregister = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { toast } = useToast()


    const initialstate = {
        username: "",
        email: "",
        password: "",
    }

    const onsubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.sucess) {
                navigate('/auth/login')
                toast({
                    title: "Registration Succesfully",
                })
            }
        }
        )
    }
    const [formData, setFormData] = useState(initialstate)

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='font-bold text-3xl font-HeadFont'>Create New Account </h1>
                <p className='  '>Already Have Account? <Link to={'/auth/login'} >Log In</Link> </p>
            </div>
            <CommonForm formControls={registerFormControl} formData={formData} setFormData={setFormData} buttontext="Sign Up" onsubmit={onsubmit} />
        </div>
    )
}

export default Authregister
