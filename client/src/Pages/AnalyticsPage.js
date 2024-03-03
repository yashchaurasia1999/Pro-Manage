import React from 'react'
import Analytics from '../Components/Analytics'
import style from './analyticsPage.module.css'
import NavBar from '../Components/NavBar'

export default function AnalyticsPage() {
  return (
    <>
        <div className={style.container}>
            <div className={style.navbar}>
                <NavBar/>
            </div>
            <div className={style.setting}>
                <Analytics/>
            </div>
        </div>
    </>
  )
}
