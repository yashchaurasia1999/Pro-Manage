import React, { useState, useEffect,useRef } from 'react';
import style from './navbar.module.css';
import dashboardLogo from '../Images/dashboardLogo.png';
import logout from '../Images/logout.png';
import { useNavigate } from 'react-router-dom';
import LogoutModal from './LogoutModal';

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButtonBoard, setActiveButtonBoard] = useState(false);
  const [activeButtonAnalytics, setActiveButtonAnalytics] = useState(null);
  const [activeButtonSetting, setActiveButtonSetting] = useState(false);

  const boardRef = useRef(null);
  const settingRef = useRef(null);

  const navigator = useNavigate();
  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('jwttoken')
    localStorage.removeItem('User-Name')
    navigator('/');
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  const handleBoard = () => {
    if (!activeButtonBoard) {
      setActiveButtonBoard(true);
      setActiveButtonSetting(false);
      navigator('/dashboard');
    }
  };
  const handleAnalytics=()=>{
    navigator('/analytics')
  }
  const handleSetting = () => {
    if (!activeButtonSetting) {
      setActiveButtonSetting(true);
      setActiveButtonBoard(false);
      navigator('/setting');
    }
  };
 


  return (
    <>
      <div className={style.wrapper}>
        <div className={style.heading}>
          <img src={dashboardLogo} alt="dashboard logo" />&nbsp;&nbsp;
          <h5>Pro Manage</h5>
        </div>
        <div className={style.navLink}>
          
          <p className={activeButtonBoard ? style.withEffect : style.withoutEffect} onClick={handleBoard}>Board</p>
          <p onClick={handleAnalytics}>Analytics</p>
          <p className={activeButtonSetting ? style.withEffect : style.withoutEffect} onClick={handleSetting}>Settings</p>
        </div>

        <div className={style.logout}>
          <img src={logout} onClick={handleLogout} alt="logout logo" />&nbsp;&nbsp;
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>
      {isModalOpen && (
        <LogoutModal onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}
    </>
  );
}
