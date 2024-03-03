import React from 'react'
import RegisterFields from '../Components/RegisterFields'
import style from './registerPage.module.css'
import LoginImg from '../Components/LoginImg'
export default function RegisterPage() {
  return (
    <>
         <div className={style.container}>
            <div className={style.loginImg}>
                <LoginImg/>
            </div>
            <div className={style.loginFields}>
                <RegisterFields/>
            </div>
        </div>
    </>
  )
}
