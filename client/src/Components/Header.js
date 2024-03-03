import React, { useState } from 'react';
import style from './header.module.css';
import weeks from '../Images/weeks.png';

export default function Header() {
  const [weeksPopUp, setWeeksPopUp] = useState(false);
  const user=localStorage.getItem('User-Name');
  const handleWeeks = () => {
    setWeeksPopUp(!weeksPopUp);
  };
  function formatTodayDate() {
    const options = { month: 'short', year: 'numeric' };
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);
  
    return `${getDayWithSuffix(today)} ${formattedDate}`;
  }
  
  function getDayWithSuffix(date) {
    const day = date.getDate();
    const suffix = getDaySuffix(day);
  
    return `${day}${suffix}`;
  }
  
  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
  
    const lastDigit = day % 10;
  
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
  
  // Example usage
  const todayFormatted = formatTodayDate();
  console.log(todayFormatted);
  



  return (
    <>
      <div className={style.headerContainer}>
        <h3>Welcome! {user}</h3>
        <p>{todayFormatted}</p>
      </div>
      <div className={style.headerWeak}>
        <h2>Board</h2>
        <p style={{ cursor: 'pointer' }}>
          This Week &nbsp;&nbsp;
          <img src={weeks} onClick={handleWeeks} alt='down-arrow' />
        </p>
      </div>
      {weeksPopUp && (
        <div className={style.listOfDate}>
          <ul>
            <li>Today</li>
            <li>This Week</li>
            <li>This Month</li>
          </ul>
        </div>
      )}
    </>
  );
}
