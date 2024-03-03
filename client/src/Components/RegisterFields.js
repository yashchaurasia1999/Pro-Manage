import React from "react";
import style from "./registerFields.module.css";
import eye from '../Images/eye.png'
import lock from '../Images/lock.png'
import mail from '../Images/mail.png'
import user from '../Images/user.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState , useRef} from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
export default function RegisterFields() {
  // const notify = () => toast("Wow so easy!");
  const navigator=useNavigate()
  const confirmPassRef=useRef('h')
  const passRef=useRef('h')
  const [isShowConfirmPassword,setisShowConfirmPassword]=useState(false)
  const [isShowPassword,setisShowPassword]=useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleShowConfirmPassword=()=>{
    if(isShowConfirmPassword)
    {
      confirmPassRef.current.type='password'
      setisShowConfirmPassword(false)
    }
    else
    {
      confirmPassRef.current.type='text'
      setisShowConfirmPassword(true)
    }
    
  }
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
  const [err,setErr]=useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleLogin=()=>{
    navigator('/')
  }
  const handleSubmit = async(e) => {

    e.preventDefault();
  
    if(form.name=='' ||form.email=='' || form.password=='' || form.confirmPassword=='' )
    {
      toast.error('Please Fill All the details')
      setErr('Please Fill All the details')
      setTimeout(() => {
        setErr('')
      }, 3000);
      
    }
    else if(form.confirmPassword!=form.password)
    {
      toast.error('Password And Confirm Password should be Same!!')
      setErr('Password And Confirm Password should be Same!!')
      setTimeout(() => {
        setErr('')
      }, 3000);
    }
    else{
      const res=await fetch('http://localhost:4000/register',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({name:form.name,email:form.email,password:form.password,confirmPassword:form.confirmPassword})
    })
    console.log('hello')
    
    const data=await res.json()
    console.log(data)
    if(data.status=='failed')
    {
      toast.error('This Email is already Exist Please Try another Email')
      setErr('This Email is already Exist Please Try another Email')
      setTimeout(() => {
        setErr('')
      }, 3000);
      
    }
    else
    {
      toast.success("Registration successful!");
      
    }
    
    }
    setForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <>
      <ToastContainer /> 
      <div className={style.heading}>
      
          <h1>Register</h1>
        </div>
      <div className={style.containerField}>
        
        <form>
        <div className={style.inputField}>
            <img src={user} alt="mail image" />
            <input
              type="text"
              className={style.email}
              name="name"
              value={form.name} onChange={(e)=>handleChange(e)}
              id=""
              placeholder="Name"
            />
          </div>
          <div className={style.inputField}>
            <img src={mail} alt="mail image" />
            <input
              type="email"
              className={style.email}
              name="email"
              value={form.email} onChange={handleChange}
              id=""
              placeholder="Email"
            />
          </div>
          <div className={style.inputField}>
            <img src={lock} alt="mail image" />
            <input
              type="password"
              className={style.email}
              name="password"
              value={form.password} onChange={handleChange}
              ref={passRef}
              id=""
              placeholder="Password"
            />
            {
              isShowPassword? <img onClick={handleShowPassword}  src={eye} alt="eye-image" />: <FaEyeSlash onClick={handleShowPassword} className={style.eye} style={{height:'20px',width:'25px',marginTop:'10px'}}/>
            }
          </div>
          <div className={style.inputField}>
            <img src={lock} alt="mail image" />
            <input
              type="password"
              className={style.email}
              name="confirmPassword"
              value={form.confirmPassword} onChange={handleChange}
              ref={confirmPassRef}
              id=""
              placeholder="Confirm Password"
            />
            {
              isShowConfirmPassword? <img onClick={handleShowConfirmPassword}  src={eye} alt="eye-image" />: <FaEyeSlash onClick={handleShowConfirmPassword} className={style.eye} style={{height:'20px',width:'25px',marginTop:'10px'}}/>
            }
          </div>
        </form>
      </div>
      <div className={style.buttons}>
        <div className={style.registerBtn}>
            <button className='' onClick={handleSubmit}>Register</button>
        </div>
        <div>
          <p>Have an Account ?</p>
        </div>
        <div className={style.loginBtn}>
          <button className='' onClick={handleLogin}>Login</button>
        </div>
          
      </div>

    </>
  );
}
