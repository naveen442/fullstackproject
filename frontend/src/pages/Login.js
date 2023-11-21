import React from 'react'
import { useState,useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset,login } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
const Login = () => {
    const [formData,setFormData]=useState({
        email:'',
        password:'',
    })
    const {email,password}=formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const { user, isError, isLoading, isSuccess, message } = useSelector(
      (state) => state.auth
    );
    useEffect(() => {
      if (isError) {
        toast.error(message);
      }
  
      if (isSuccess && user) {
        navigate('/');
      }
  
      dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);
    // const onchange=(e)=>{
    //     setFormData((prev)=>({
    //             ...prev,
    //             [e.target.name]:e.target.value
    //     }))
    // }
   const onchange=(e)=>{
    setFormData((prev)=>{
       return(
        {
            ...prev,
            [e.target.name]:e.target.value
        }
       )
    })
   
   }
    const onsubmit=(e)=>{
      e.preventDefault();
      const userData = {
         email,
         password,
       };
       dispatch(login(userData));
      console.log(formData);
    }

    if (isLoading) {
      <Spinner />;
    }
  
  return (
    <>
    <section className='heading'>
     <h1> <FaSignInAlt/>Login</h1>
     <p>please login and set goals</p>
    </section>
    <section className='form'>
    <form onSubmit={onsubmit}>
 <div className='form-group'>
    <input 
    type='email' 
    name="email" 
    value={email} 
    placeholder='please Enter a email' 
    id="email"
    className='form-control'
    onChange={onchange}
    />
 </div>
 <div className='form-group'>
    <input 
    type='password' 
    name="password" 
    value={password} 
    placeholder='please Enter a password' 
    id="password"
    className='form-control'
    onChange={onchange}
    />
 </div>
 <div className='form-group'>
    <button type="submit" className='btn btn-block'>Submit</button>
 </div>
    </form>
   </section>
   </>
  )
}

export default Login
