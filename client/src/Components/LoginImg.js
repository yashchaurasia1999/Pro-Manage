import React from 'react'
import authLogo from '../Images/authLogo.png'
import style from './loginImg.module.css'
export default function LoginImg() {
  return (
    <>
        <div className={style.coverBackground}>
            <img className={style.logo} src={authLogo} alt='image'/>
            <div className={style.logoText}>
              <p>Welcome aboard my friend</p>
              <p>just a couple of clicks and we start</p>
            </div>
            
        </div>
        
    </>
  )
}
