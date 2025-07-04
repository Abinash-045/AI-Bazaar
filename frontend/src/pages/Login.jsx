import React from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';

function Login() {
    let [show,setShow] = useState(false)
        let [email,setEmail] = useState("")
        let [password,setPassword] = useState("")
        let {serverUrl} = useContext(authDataContext)
        let {getCurrentUser} = useContext(userDataContext)
        let [loading,setLoading] = useState(false)

    let navigate = useNavigate()

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            let result = await axios.post(serverUrl + '/api/auth/login',{
                email,password
            },{withCredentials:true})
            console.log(result.data)
            setLoading(false)
            getCurrentUser()
            navigate("/")
            toast.success("User Login Successful")
            
        } catch (error) {
            console.log(error)
            toast.error("User Login Failed")
        }
    }
     const googlelogin = async () => {
            try {
                const response = await signInWithPopup(auth , provider)
                let user = response.user
                let name = user.displayName;
                let email = user.email
    
                const result = await axios.post(serverUrl + "/api/auth/googlelogin" ,{name , email} , {withCredentials:true})
                console.log(result.data)
                getCurrentUser()
            navigate("/")
    
            } catch (error) {
                console.log(error)
            }
            
        }
  return (
<div className='w-[100vw] h-[100vh] bg-black text-white flex flex-col items-center justify-start'>
  {/* Header */}
  <div className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
    <img className='w-[40px]' src={Logo} alt="" />
    <h1 className='text-[22px] font-sans text-green-400 font-bold'>AI Bazaar</h1>
  </div>

  {/* Title */}
  <div className='w-full h-[100px] flex items-center justify-center flex-col gap-[10px]'>
    <span className='text-[25px] font-semibold'>Login Page</span>
    <span className='text-[16px] text-gray-400'>Welcome to AI Bazaar, Place your order</span>
  </div>

  {/* Form Container */}
  <div className='max-w-[600px] w-[90%] h-[500px] bg-[#0c0c0c] border border-[#00ff84a0] shadow-[0_0_30px_#00ff84a0] rounded-2xl flex items-center justify-center'>
    <form onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>

      {/* Google Login */}
      <div className='w-full h-12 bg-white text-black hover:bg-gray-200 transition-all duration-300 rounded-full flex items-center justify-center gap-3 font-semibold shadow-md cursor-pointer'
        onClick={googlelogin}>
        <img src={google} alt="" className='w-5 h-5' /> Login with Google
      </div>

      {/* OR Divider */}
      <div className='w-full h-5 flex items-center justify-center gap-[10px] text-gray-400 text-sm'>
        <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
      </div>

      {/* Form Fields */}
      <div className='w-[90%] flex flex-col items-center justify-center gap-[15px] relative'>

        <input
          type="text"
          className='w-full h-12 px-4 rounded-full bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300'
          placeholder='Email'
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type={show ? "text" : "password"}
          className='w-full h-12 px-4 pr-12 rounded-full bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300'
          placeholder='Password'
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        {!show && <IoEyeOutline className='w-5 h-5 cursor-pointer absolute right-4 top-[85px] text-gray-400 hover:text-green-400' onClick={() => setShow(prev => !prev)} />}
        {show && <IoEye className='w-5 h-5 cursor-pointer absolute right-4 top-[85px] text-gray-400 hover:text-green-400' onClick={() => setShow(prev => !prev)} />}

        {/* Submit Button */}
        <button className='w-full h-12 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full transition-all duration-300 mt-2'>
          {loading ? <div className='flex justify-center items-center w-full'><Loading /></div> : "Login"}
        </button>

        {/* Register Redirect */}
        <p className='text-sm text-gray-400'>
          You haven't any account?
          <span className='text-green-400 hover:underline cursor-pointer ml-2' onClick={() => navigate("/signup")}>Create New Account</span>
        </p>
      </div>
    </form>
  </div>
</div>

  )
}

export default Login
