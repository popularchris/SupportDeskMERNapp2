import React from 'react'
import { Link } from 'react-router-dom'
import {FaSignInAlt,FaUser,FaSignOutAlt} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { logout,reset } from '../features/auth/authSlice'
function Header() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user}=useSelector((state)=>
        state.auth
    )
    const onLogout=()=>{
        dispatch(logout())
        dispatch(reset)

        navigate('/')
    }
  return (
     
   <header className='header'>
    <div className="logo">
      <Link to='/'>Support Desk</Link>
    </div>
    <ul>
        {user ? (<li><button className='btn' onClick={onLogout}><FaSignOutAlt/>LogOut</button></li>):(<><li>
            <Link to='/Register'>
            <FaUser/>
            Register
            </Link>
        </li>
        <li>
            <Link to='/Login'>
            <FaSignInAlt/>
            Login
            </Link>
        </li></>)}
       
        <li>
            <Link to='/'>
        <FaSignOutAlt/>
        Logout
            </Link>
        </li>
    </ul>
   </header>
  )

}

export default Header