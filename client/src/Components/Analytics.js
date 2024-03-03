import React from 'react'
import style from './analytics.module.css'
import bulletPoint from '../Images/bulletPoint.png'
import { useEffect, useState } from 'react';
export default function Analytics() {
    const [todoData,setTodoData]=useState()
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:4000/show-todo");
            const data = await response.json();
            console.log(data.values[0].priority);
          
            if (response.ok) {
              // Update state with the received data
              setTodoData(data.values);
            } else {
              console.error("Failed to fetch data:", data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
      const countHighPriorityTasks = () => {
        if (!todoData || todoData.length === 0) {
          return 0; // Return 0 if todoData is undefined or empty
        }
    
        const highPriorityTasks = todoData.filter(task => task.priority === 'High');
        return highPriorityTasks.length;
      };
      const countLowPriorityTasks = () => {
        if (!todoData || todoData.length === 0) {
          return 0; // Return 0 if todoData is undefined or empty
        }
    
        const highPriorityTasks = todoData.filter(task => task.priority === 'Low');
        return highPriorityTasks.length;
      };
      const countModeratePriorityTasks = () => {
        if (!todoData || todoData.length === 0) {
          return 0; // Return 0 if todoData is undefined or empty
        }
    
        const highPriorityTasks = todoData.filter(task => task.priority === 'Moderate');
        return highPriorityTasks.length;
      };
    
  return (
    <>
        <div className={style.header}>
            <h2>Analytics</h2>
        </div>
        <div className={style.analyticsContainer}>
            <div className={style.analyticsLeft}>
                <div className={style.analytics}>
                    <p><img src={bulletPoint} alt='bullet-point img'/>&nbsp;&nbsp;Backlog Tasks</p>
                    <p>0</p>
                </div>
                <div className={style.analytics}>
                    <p><img src={bulletPoint} alt='bullet-point img'/>&nbsp;&nbsp;Todo-Tasks</p>
                    <p>{!todoData ? 0 : todoData.length}</p>
                </div>
                <div className={style.analytics}>
                    <p><img src={bulletPoint} alt='bullet-point img'/>&nbsp;&nbsp;In-Progress Tasks</p>
                    <p>0</p>
                </div>
                <div className={style.analytics}>
                    <p><img src={bulletPoint} alt='bullet-point img'/>&nbsp;&nbsp;Completed</p>
                    <p>0</p>
                </div>
                
            </div>
            <div className={style.analyticsRight}>
            <div className={style.analytics}>
                    <p><img src={bulletPoint} alt='bullet-point img'/>&nbsp;&nbsp;Low Priority</p>
                    <p>{countLowPriorityTasks() || '0'}</p>
                </div>
                <div className={style.analytics}>
                    <p><img src={bulletPoint} alt='bullet-point img'/>&nbsp;&nbsp;Moderate</p>
                    <p>{countModeratePriorityTasks() || '0'}</p>
                </div>
                <div className={style.analytics}>
                    <p><img src={bulletPoint} alt='bullet-point img'/>&nbsp;&nbsp;High</p>
                    <p>{countHighPriorityTasks() || '0'}</p>
                </div>
                <div className={style.analytics}>
                    <p><img src={bulletPoint} alt='bullet-point img'/>&nbsp;&nbsp;Due Date Tasks</p>
                    <p>0</p>
                </div>
            </div>
        </div>
    </>
  )
}
