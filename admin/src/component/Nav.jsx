import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

function Nav() {
    let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext)
    let {getAdmin} = useContext(adminDataContext)

    const logOut = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials:true})
            console.log(result.data)
            toast.success("LogOut Successfully")
            getAdmin()
            navigate("/login")

        } catch (error) {
            console.log(error)
            toast.error("LogOut Failed")
        }
        
    }
  return (
    <div  className='w-[100vw] h-[70px] bg-[#1bdbdbec] z-10 fixed top-0 flex  items-center justify-between px-[30px] shadow-md shadow-black '>
        <div  className='w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px] cursor-pointer group transition-all duration-300 hover:scale-[1.02]' onClick={()=>navigate("/")}>
        <img src={logo} alt=""  className='w-[30px]'/>
        <h1 className='text-[25px] text-black font-sans group-hover:text-[#ff4ddb] transition-colors duration-300'>AI Bazaar</h1>

       


        </div>
         <button className='text-[15px] bg-[#d1fae5] text-black py-[10px] px-[20px] rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_#ff4ddb] hover:text-[#ff4ddb]' onClick={logOut}>LogOut</button>
      
    </div>
  )
}

export default Nav
