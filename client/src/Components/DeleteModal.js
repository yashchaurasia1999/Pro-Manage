import React from 'react'
import style from './logoutModal.module.css'
export default function DeleteModal({onConfirm,onCancel}) {

  
    
  return (
    <>
        <div className={style.modalBackdrop}>
          <div className={style.modal}>
            <p>Are you sure you want to Delete?</p>
            <div className={style.modalButtons}>
              <button onClick={onConfirm}>Yes</button>
              <button onClick={onCancel}>No</button>
            </div>
          </div>
        </div>
    </>
  )
}
