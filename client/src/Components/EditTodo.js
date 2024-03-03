// EditTodo.js

import React, { useState, useEffect } from "react";
import style from "./addTodoes.module.css";

import deleteLogo from "../Images/deleteLogo.png";

const EditTodo = ({ todoData, onConfirm, onCancel }) => {
  const [todoText, setTodoText] = useState("");
  const [inputData, setInputData] = useState([]);
  const [priority, setPriority] = useState(null);
  const [list, setList] = useState([{}]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [editTodoData,setEditTodoData]=useState()

  useEffect(() => {
    // Populate the state with the selected todoData
    if (todoData) {
      setTodoText(todoData.title);
      setPriority(todoData.priority);
      setDate(todoData.date);
      setEditTodoData(todoData);

      const checklistData = todoData.checkList || [];
      setInputData(checklistData.map((item) => ({ task: item.description, completed: item.completed })));
    }
  }, [todoData]);

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleChange = (e, idx) => {
    const { value, type, checked } = e.target;

    setInputData((prev) => {
      const updatedData = [...prev];
      if (type === "checkbox") {
        updatedData[idx] = { ...updatedData[idx], completed: checked };
      } else {
        // If it's not a checkbox, it's a text input
        updatedData[idx] = { ...updatedData[idx], task: value };
      }
      return updatedData;
    });
  };
  const handleSave = async () => {
    // alert('edit')
    // alert(editTodoData._id)
    try {
      const data = inputData.map((item) => ({ description: item.task, completed: item.completed || false }));
        
      const res = await fetch(`http://localhost:4000/update-todo/${editTodoData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, priority, date, data }),
      });
      const taskValue=res.json()
      console.log(taskValue)
      if (res.ok) {
        onConfirm();
      } else {
        console.error('Failed to update todo:', res);
        // Handle error as needed
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      // Handle error as needed
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handlePriority = (priority) => {
    setPriority(priority);
  };

  

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={style.modalBackdrop}>
      <div className={style.modal}>
        <div className={style.title}>
          <h3>Edit Todo</h3>
          <input
            type="text"
            placeholder="Enter Task Title"
            value={todoText}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.selectPriority}>
          <p>Select Priority *</p>
          {priority}
        </div>

        <div className={style.checkList}>
          <h4>CheckList(0/{inputData.length})</h4>
          {inputData.map((ele, idx) => (
            <div className={style.inputField}>
            <input
             type="checkbox"
             className={style.check}
             name={`completed-${idx}`}
             id={`completed-${idx}`}
             checked={inputData[idx] ? inputData[idx].completed : false}
             onChange={(e) => handleChange(e, idx)}
           />
         <input
         className={style.inputArea}
         type="text"
         value={inputData[idx] ? inputData[idx].task : ""}
         onChange={(e) => handleChange(e, idx)}
         placeholder="Add a Task"
       />
         {/* <img
           src={deleteLogo}
           alt="delete-Logo"
           onClick={() => handleDeleteInput(idx)}
         /> */}
       </div>
          ))}

          <div className={style.addNew}>
            {/* ... (unchanged) */}
          </div>
        </div>
        <div className={style.modalButtons}>
          <input
            type="date"
            value={date}
            className={style.selectDate}
            onChange={(e) => handleDateChange(e)}
            placeholder="Select Date"
          />
          <button className={style.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
          <button className={style.saveBtn} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
