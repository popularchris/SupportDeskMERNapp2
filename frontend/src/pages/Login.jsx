import React from 'react'
import { useState,useEffect } from 'react'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import { useSelector,useDispatch } from 'react-redux'
import { login ,reset} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function Login() {
  const [formdata,setformData]=useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })
  const {email,password}=formdata
  const {isLoading,isSuccess,message,user,isError}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const onChange=(e)=>{
    setformData((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))

  } 
  const navigate=useNavigate()
  useEffect(()=>{
      if(isError){
        toast.error(message)
      }else{
      if(user || isSuccess){
        navigate('/new-ticket')
      }
      }
      dispatch(reset())
    },[navigate,dispatch,message,user,isSuccess,isError])
  const onSubmit=(e)=>{
    e.preventDefault()

          const userData={
            email,
            password
          }
            dispatch(login(userData))

   }
   if(isLoading){
    return <Spinner/>
   }
  return (
    <>
    <section className='heading'>
        <h1>
          <FaUser/>
          </h1>
        <p>Log in to get support</p>
      </section>
        <section className='form'>
          <form onSubmit={onSubmit}>
              <div className='form-group'>

                    <label htmlFor='email'>Enter your email </label>
                    <input type='email' value={email} id='email' name="email"
                    placeholder='Enter email' onChange={onChange} required></input>
                    <label htmlFor='password'>Enter in your  password </label>
                    <input type='password' value={password} id='password' name='password'
                    placeholder='Enter your password' onChange={onChange} required></input>
              </div>
              <div className='form-group'>
                <button className='btn btn-block'>
                    Submit
                </button>
              </div>
          </form>
        </section>

    </>
  )
}


export default Login