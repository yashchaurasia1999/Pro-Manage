import React from 'react'
import style from './logoutModal.module.css'
export default function LogoutModal({ onConfirm, onCancel }) {
  return (
    <>
     <div className={style.modalBackdrop}>
          <div className={style.modal}>
            <p>Are you sure you want to Logout?</p>
            <div className={style.modalButtons}>
              <button onClick={onConfirm}>Yes, Logout</button>
              <button onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </div>
    </>
  )
}
