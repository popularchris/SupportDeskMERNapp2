import React, { useEffect } from 'react'
import { useState } from 'react'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import { register ,reset} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'


function Register() {
  const [formData,setformData]=useState({
    name:'',
    email:'',
    password:'',
    password2:'',
  })
  const{name,email,password,password2}=formData
  const dispatch=useDispatch()
  const {user,message,isError,isloading,isSuccess}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess||user){
      navigate('/')
    }
    dispatch(reset())
  },[user,message,isSuccess,isError,navigate,dispatch])
  const onChange =(e)=>{
    setformData((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value

    }))
  }

  const onSubmit=(e)=>{

    e.preventDefault()
    if(password !==password2){
      toast.error('Your passwords do not match')
    }
    else{
      const userData=({
        email,
        name,
        password,
        password2
      })
        dispatch(register(userData))
    }}
    if(isloading){
      return <Spinner/>
    }
      return (
        <>
          <section className='heading'>
            <h1>
              <FaUser/>
              </h1>
            <p>Register an account</p>
          </section>
            <section className='form'>
              <form onSubmit={onSubmit}>
                  <div className='form-group'>
                      <label htmlFor='name'>Fill in your  name </label>
                      <input type='text' value={name} id='name' name='name' 
                        placeholder='Enter name' className='form-control' onChange={onChange} required></input>
                        <label htmlFor='email'>Enter your email </label>
                        <input type='email' value={email} id='email' name="email"
                        placeholder='Enter email' onChange={onChange} required></input>
                        <label htmlFor='password'>Enter in your  password </label>
                        <input type='password' value={password} id='password' name='password'
                        placeholder='Enter your password' onChange={onChange} required></input>
                        <label htmlFor='name'>Please confirm password </label>
                        <input type='password' value={password2} id='password2' name="password2" 
                        placeholder='Confirm your password' onChange={onChange} required></input>
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


export default Register