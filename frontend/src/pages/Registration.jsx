import React from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Registration() {
    let [show, setShow] = useState(false)
    let { serverUrl } = useContext(authDataContext)
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let { userdata, getCurrentUser } = useContext(userDataContext)
    let [loading, setLoading] = useState(false)

    let navigate = useNavigate()

    const handleSignup = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const result = await axios.post(serverUrl + '/api/auth/registration', {
                name, email, password
            }, { withCredentials: true })
            getCurrentUser()
            navigate("/")
            toast.success("User Registration Successful")
            console.log(result.data)
            setLoading(false)

        } catch (error) {
            console.log(error)
            toast.error("User Registration Failed")
        }
    }

    const googleSignup = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let user = response.user
            let name = user.displayName;
            let email = user.email

            const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true })
            console.log(result.data)
            getCurrentUser()
            navigate("/")
            toast.success("User Registration Successful")

        } catch (error) {
            console.log(error)
            toast.error("User Registration Failed")
        }
     }

    return (
        <div className='w-[100vw] h-[100vh] bg-black text-white flex flex-col items-center justify-start'>
            <div className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
                <img className='w-[40px]' src={Logo} alt="" />
                <h1 className='text-[22px] font-sans text-green-400 font-bold'>AI Bazaar</h1>
            </div>

            <div className='w-full h-[100px] flex items-center justify-center flex-col gap-[10px]'>
                <span className='text-[25px] font-semibold'>Registration Page</span>
                <span className='text-[16px] text-gray-400'>Welcome to AI Bazaar, Place your order</span>
            </div>

            <div className='max-w-[600px] w-[90%] h-[500px] bg-[#0c0c0c] border border-[#00ff84a0] shadow-[0_0_30px_#00ff84a0] rounded-2xl flex items-center justify-center'>
                <form onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>

                    <div className='w-full h-12 bg-white text-black hover:bg-gray-200 transition-all duration-300 rounded-full flex items-center justify-center gap-3 font-semibold shadow-md cursor-pointer'
                        onClick={googleSignup}>
                        <img src={google} alt="" className='w-5 h-5' /> Sign up with Google
                    </div>

                    <div className='w-full h-5 flex items-center justify-center gap-[10px]'>
                        <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                    </div>

                    <div className='w-[90%] flex flex-col items-center justify-center gap-[15px] relative'>

                        <input type="text" placeholder='UserName'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full h-12 px-4 rounded-full bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300'
                        />

                        <input type="text" placeholder='Email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full h-12 px-4 rounded-full bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300'
                        />

                        <div className='relative w-full'>
                            <input
                                type={show ? "text" : "password"}
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full h-12 px-4 pr-12 rounded-full bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300'
                            />
                            {!show ? (
                                <IoEyeOutline className='absolute right-4 top-3 text-gray-400 hover:text-green-400 cursor-pointer'
                                    onClick={() => setShow(true)} />
                            ) : (
                                <IoEye className='absolute right-4 top-3 text-gray-400 hover:text-green-400 cursor-pointer'
                                    onClick={() => setShow(false)} />
                            )}
                        </div>

                        <button className='w-full h-12 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full transition-all duration-300 mt-2'>
  {loading ? <div className="flex justify-center items-center w-full"><Loading /></div> : "Create Account"}
</button>

                        <p className='text-sm text-gray-400'>
                            Already have an account?
                            <span className='text-green-400 hover:underline cursor-pointer ml-2' onClick={() => navigate("/login")}>Login</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration;
