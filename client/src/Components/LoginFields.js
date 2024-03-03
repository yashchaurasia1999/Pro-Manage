import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import style from "./registerFields.module.css";
import eye from "../Images/eye.png";
import lock from "../Images/lock.png";
import mail from "../Images/mail.png";


import { useNavigate } from "react-router-dom";
import { useState,useRef } from "react";
// import { toast } from 'react-toastify';
import { FaEyeSlash } from "react-icons/fa";

export default function LoginFields() {
  
  const navigator=useNavigate()
  const [err,setErr]=useState('')
  const [isShowPassword,setisShowPassword]=useState(false)
  const passRef=useRef()
  const handleRegister=()=>{
    navigator('/register')
  }
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleShowPassword=()=>{
    if(isShowPassword)
    {
      passRef.current.type='password'
      setisShowPassword(false)
    }
    else
    {
      passRef.current.type='text'
      setisShowPassword(true)
    }
    
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(loginForm.email=='' || loginForm.password=='')
    {
      toast.error('Please Enter Your Credentials!!')
      setErr('Please Enter Your Credentials!!')
      setTimeout(() => {
        setErr('')
      }, 3000);
    }
    else
    {
      const res=await fetch('http://localhost:4000/login',{
      method:"POST",
      headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify({email:loginForm.email,password:loginForm.password})
      })
      const data=await res.json()
      console.log(data)

      if(data.reason=='incorrect')
      {
        toast.error('Your Credentials are incorrect')
        setErr('Your Credentials are incorrect')
        setTimeout(() => {
          setErr('')
        }, 3000);
      }
      else if(data.reason=='not exist')
      {
        toast.error('User Does not Exist')
        setErr('User Does not Exist')
        setTimeout(() => {
          setErr('')
        }, 3000);
      }
      else
      {
        localStorage.setItem('jwt-token',data.jwttoken)
        localStorage.setItem('User-Name',data.name)
        toast.success("Logged-In successful!");
        navigator('/dashboard')
      } 
    }
  };

  
  return (
    <>
    <ToastContainer/>
      <div className={style.headingLogin}>
      
        <h1>Login</h1>
      </div>
      <div className={style.containerFieldLogin}>
        <form>
          <div className={style.inputField}>
            <img src={mail} alt="mail image" />
            <input
              type="email"
              className={style.email}
              name='email'
              onChange={handleChange}
              id=""
              placeholder="Email"
            />
          </div>
          <div className={style.inputField}>
            <img src={lock} alt="mail image" />
            <input
              type="password"
              className={style.email}
              name='password'
              ref={passRef}
              onChange={handleChange}
              id=""
              placeholder="Password"
            />
            {
              isShowPassword? <img onClick={handleShowPassword}  src={eye} alt="eye-image" />: <FaEyeSlash onClick={handleShowPassword} style={{height:'20px',width:'25px',marginTop:'10px'}}/>
            }
          </div>
        </form>
      </div>
      <div className={style.buttonsLogin}>
        <div className={style.registerBtn}>
          <button className="" onClick={handleSubmit}>Login</button>
        </div>
        <div>
          <p>Have no Account yet?</p>
        </div>
        <div className={style.loginBtn}>
          <button className="" onClick={handleRegister}>Register</button>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}
