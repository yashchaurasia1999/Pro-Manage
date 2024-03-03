import React from 'react'
import style from './settingPage.module.css'
import NavBar from '../Components/NavBar'
import Setting from '../Components/Setting'
export default function SettingPage() {
  return (
    <>
        <div className={style.container}>
            <div className={style.navbar}>
                <NavBar/>
            </div>
            <div className={style.setting}>
                <Setting/>
            </div>
        </div>
    </>
  )
}
