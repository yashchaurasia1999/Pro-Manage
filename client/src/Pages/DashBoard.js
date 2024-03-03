import React, { useEffect } from 'react'
import NavBar from '../Components/NavBar'
import Header from '../Components/Header'
import style from './dashboard.module.css'
import Todoes from '../Components/Todoes'
export default function DashBoard() {

  
 
  return (
    <>

    <div className={style.container}>
        <div className={style.navbar}>
          <NavBar/>
        </div>
        <div className={style.header}>
        <Header/>
        </div>
        <div className={style.mainContent}>
        <Todoes/>
        </div>
    </div>
     
        
    </>
  )
}
