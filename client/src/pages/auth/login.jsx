import CommonForm from "@/components/common/Form";
import { LoginFormControl } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser, VerifyOtpLogin } from "@/store/auth-slice";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Authlogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      otp: "",
    },
  });

  const [formData, setFormData] = useState({});
  const [showOTP, setShowOTP] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);

  // Watch email and password fields
  const email = watch("email");
  const password = watch("password");

  // Check if both email and password are filled to show Send OTP button
  const canSendOTP = () => {
    const isEmailValid =
      email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = password && password.length > 0;
    return isEmailValid && isPasswordValid && !showOTP;
  };

  const handleSendOTP = () => {
    setShowOTP(true);
    setIsOTPSent(true);

    // Get current form values immediately - this is the best approach
    const currentFormData = getValues(); // gets { email, password, otp }

    // Send only email and password for OTP request (otp will be empty initially)
    const otpRequestData = {
      email: currentFormData.email,
      password: currentFormData.password,
    };
    console.log(otpRequestData);
    dispatch(VerifyOtpLogin(otpRequestData)).then((data) => {
      console.log(data);
      toast({
        title: "OTP Sent!",
        description: "Please check your email for the verification code.",
        variant: "success",
      });
    });
  };

  function onSubmit(formData) {
    if (showOTP && !formData.otp) {
      toast({
        title: "OTP Required",
        description: "Please enter the verification code sent to your email.",
        variant: "destructive",
      });
      return;
    }

    setFormData(formData);
    dispatch(loginUser(formData)).then((data) => {
      //Data is Payload what API Response and Also Meta Data in This Form Data
      if (data?.payload?.success) {
        toast({
          title: data.payload.message,
          variant: "success",
        });
      } else {
        toast({
          title: data.payload.message,
          variant: "destructive",
        });
      }
    });
  }

  const handleResendOTP = () => {
    // Simulate resending OTP
    toast({
      title: "OTP Resent!",
      description: "A new verification code has been sent to your email.",
      variant: "success",
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-10">
      <div className="text-center">
        <h1 className="font-bold text-3xl font-HeadFont">Welcome, User</h1>
        <p className="font-HeadFont text-sm">
          New User? <Link to={"/auth/register"}>Create Your Account</Link>
        </p>
      </div>

      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto p-6 border rounded-lg"
      >
        <div className="flex flex-col gap-4 font-HeadFont">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              placeholder="Enter Email"
              type="text"
              {...register("email", {
                required: { value: true, message: "Email is Required" },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid Email",
                },
              })}
              className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#682c0d]"
            />
            {errors.email && (
              <span className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              placeholder="Enter Password"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is Required",
                },
                // minLength: { value: 8, message: "At least 8 Character is Required" },
              })}
              className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#682c0d]"
            />
            {errors.password && (
              <span className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Send OTP Button - Shows when email and password are valid */}
          {canSendOTP() && (
            <button
              type="button"
              onClick={handleSendOTP}
              className="bg-[#c06e39] text-white hover:text-[#5c3013] rounded-md px-4 py-2 cursor-pointer hover:bg-[#c48256] transition-all duration-300"
            >
              Send OTP
            </button>
          )}

          {/* OTP Section - Shows after user clicks Send OTP */}
          {showOTP && (
            <div className="flex flex-col animate-in slide-in-from-top duration-300">
              <div className="mb-2 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-700 text-sm">
                  📧 We've sent a verification code to <strong>{email}</strong>
                </p>
              </div>

              <label htmlFor="otp" className="text-sm font-medium">
                Verification Code
              </label>
              <input
                placeholder="Enter 6-digit OTP"
                type="text"
                maxLength="6"
                {...register("otp", {
                  required: { value: true, message: "OTP is Required" },
                  pattern: {
                    value: /^\d{6}$/,
                    message: "OTP must be 6 digits",
                  },
                })}
                className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#682c0d] text-center text-lg tracking-widest"
                onInput={(e) => {
                  // Only allow numbers
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
              {errors.otp && (
                <span className="text-red-600 text-sm mt-1">
                  {errors.otp.message}
                </span>
              )}

              <div className="mt-2 text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-sm text-[#682c0d] hover:underline"
                >
                  Didn't receive the code? Resend OTP
                </button>
              </div>
            </div>
          )}

          <button
            className={`text-white rounded-md px-4 py-2 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              showOTP
                ? "bg-[#682c0d] hover:bg-[#682b0dea]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            type="submit"
            disabled={isSubmitting || !showOTP}
          >
            {isSubmitting ? "Logging In..." : "Verify & Log In"}
          </button>
        </div>
      </form>

      {/* <CommonForm formControls={LoginFormControl} formData={formData} setFormData={setFormData} buttontext="Log In" onsubmit={onsubmit} /> */}
    </div>
  );
};

export default Authlogin;
