import React from 'react'
import style from './loginPage.module.css'
import LoginImg from '../Components/LoginImg'
import LoginFields from '../Components/LoginFields'


export default function LoginPage() {
  return (
    <>
        <div className={style.container}>
            <div className={style.loginImg}>
                <LoginImg/>
            </div>
            <div className={style.loginFields}>
                <LoginFields/>
            </div>
        </div>
        
    </>
  )
}
