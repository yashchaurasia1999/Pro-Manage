import React from "react";
import eye from "../Images/eye.png";
import lock from "../Images/lock.png";
import user from '../Images/user.png'
import style from './setting.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState,useRef } from "react";
import { useEffect } from "react";
import { FaEyeSlash } from "react-icons/fa";

export default function Setting() {
  const [isShowConfirmPassword, setisShowConfirmPassword] = useState(false);
  const [isShowPassword, setisShowPassword] = useState(false);
  const confirmPassRef = useRef('');
  const passRef = useRef('');
  const [userName, setUserName] = useState(localStorage.getItem('User-Name'));
  const [newPassword, setNewPassword] = useState('');
  const handleUpdate = async (e) => {
    
    try {
      const token = localStorage.getItem('jwt-token');
      const res = await fetch('http://localhost:4000/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: userName, password: newPassword }),
      });

      if (res.ok) {
        toast.success('Updation Successfully')
      } else {
        toast.error('Not Updated')
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
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


  return (
    <>
    <ToastContainer/>
      <div className={style.wrapper}>
        <p>Settings</p>
        <form>
          <div className={style.inputField}>
            <img src={user} alt="user image" />
            <input
              type="text"
              className={style.name}
              name="name"
              id=""
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className={style.inputField}>
            <img src={lock} alt="lock image" />
            <input
              type="password"
              className={style.name}
              name="name"
              id=""
              placeholder="New Password"
              ref={passRef}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {
              isShowPassword ? (
                <img onClick={handleShowPassword}  src={eye} alt="eye-image" />
              ) : (
                <FaEyeSlash onClick={handleShowPassword} className={style.eye} style={{ height: '20px', width: '30px' }}/>
              )
            }
          </div>
          <div className={style.inputField}>
            <img src={lock} alt="lock image" />
            <input
              type="password"
              className={style.name}
              name="name"
              id=""
              placeholder="Confirm Password"
              ref={confirmPassRef}
            />
            {
              isShowConfirmPassword ? (
                <img onClick={handleShowConfirmPassword}  src={eye} alt="eye-image" />
              ) : (
                <FaEyeSlash onClick={handleShowConfirmPassword} className={style.eye} style={{ height: '20px', width: '30px' }}/>
              )
            }
          </div>
          <div className={style.updateBtn}>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
