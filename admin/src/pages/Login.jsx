import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import axios from 'axios'
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  let [show,setShow] = useState(false)
          let [email,setEmail] = useState("")
          let [password,setPassword] = useState("")
          let {serverUrl} = useContext(authDataContext)
          let {adminData , getAdmin} = useContext(adminDataContext)
          let navigate = useNavigate()
          const [loading,setLoading] = useState(false)

          const AdminLogin = async (e) => {
            setLoading(true)
            e.preventDefault()
            try {
              const result = await axios.post(serverUrl + '/api/auth/adminlogin',{email , password} , {withCredentials:true})
              console.log(result.data)
              toast.success("AdminLogin Successfully")
              getAdmin()
              navigate("/")
              setLoading(false)
            } catch (error) {
              console.log(error)
              toast.error("AdminLogin Failed")
              setLoading(false)
            }
            
          }
  return (
    <div className='w-[100vw] h-[100vh] bg-black text-white flex flex-col items-center justify-start'>
  {/* Header */}
  <div className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'>
    <img className='w-[40px]' src={logo} alt="" />
    <h1 className='text-[22px] font-sans text-green-400 font-bold'>AI Bazaar</h1>
  </div>

  {/* Title */}
  <div className='w-full h-[100px] flex items-center justify-center flex-col gap-[10px]'>
    <span className='text-[25px] font-semibold'>Login Page</span>
    <span className='text-[16px] text-gray-400'>Welcome to AI Bazaar, Apply to Admin Login</span>
  </div>

  {/* Form Container */}
  <div className='max-w-[600px] w-[90%] h-[400px] bg-[#0c0c0c]  border border-[#00ff84a0] shadow-[0_0_30px_#00ff84a0] backdrop-blur-lg rounded-2xl flex items-center justify-center'>
    <form onSubmit={AdminLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>

      {/* Inputs & Button */}
      <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>

        <input
          type="text"
          className='w-full h-12 px-4 rounded-full bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 font-semibold'
          placeholder='Email'
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type={show ? "text" : "password"}
          className='w-full h-12 px-4 pr-12 rounded-full bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 font-semibold'
          placeholder='Password'
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        {!show && <IoEyeOutline  className='w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 cursor-pointer' onClick={() => setShow(prev => !prev)} />}
        {show && <IoEye className='w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 cursor-pointer' onClick={() => setShow(prev => !prev)} />}

        <button className='w-full h-12 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full transition-all duration-300 mt-2'>
          Login
        </button>
        
      </div>
    </form>
  </div>
</div>

  )
}

export default Login
