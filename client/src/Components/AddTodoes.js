import React, { useState } from "react";
import style from "./addTodoes.module.css";
import deleteLogo from "../Images/deleteLogo.png";
const AddTodoes = ({ onConfirm, onCancel }) => {
  const [todoText, setTodoText] = useState("");
  const [addInputField, setAddInputField] = useState([]);
  const [inputData,setInputData]=useState([])
  const [priority, setPriority] = useState(null);
  const [list,setList]=useState([{}]);
  const [title,setTitle]=useState('')
  const [date,setDate]=useState('')

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
    
  };
  const handleChange = (e, idx) => {
    const { value, type, checked } = e.target;
  
    setInputData((prev) => {
      const updatedData = [...prev];
      if (type === 'checkbox') {
        updatedData[idx] = { ...updatedData[idx], completed: checked };
      } else {
        // If it's not a checkbox, it's a text input
        updatedData[idx] = { ...updatedData[idx], task: value };
      }
      return updatedData;
    });
  };
  const handleDateChange=(e)=>{
    setDate(e.target.value)
  }
  const handleAddInput = () => {
    setAddInputField((prevInput) => {
      return [...prevInput, ""];
    });
  };
  const handleDeleteInput = (index) => {
    setAddInputField((prevInput) => {
      const updatedInput = [
        ...prevInput.slice(0, index),
        ...prevInput.slice(index + 1),
      ];
      return updatedInput;
    });
  };
  const handlePriority = (priority) => {
    setPriority(priority);
    // alert(priority);
  };
  const handleSave = async () => {
    try {
        const data = inputData.map(item => ({ description: item.task, completed: item.completed || false }));
        const jwtToken = localStorage.getItem('jwt-token');
        // console.log(jwtToken)
        const res = await fetch('http://localhost:4000/add-todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token:jwtToken,
            },
            body: JSON.stringify({ todoText, priority, date, data }),
        });
        console.log(await res.json())
        if (res.ok) {
            onConfirm();
        } else {
            console.error('Failed to save todo:', res);
            // Handle error as needed
        }
    } catch (error) {
        console.error('Error saving todo:', error);
        // Handle error as needed
    }
};


  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={style.modalBackdrop}>
      <div className={style.modal}>
        <div className={style.title}>
          <h3>Title</h3>
          <input
            type="text"
            placeholder="Enter Task Title"
            value={todoText}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.selectPriority}>
          <p>Select Priority *</p>
          <div className={style.high} onClick={() => handlePriority("High")}>
            <p>High Priority</p>
          </div>
          <div
            className={style.moderate}
            onClick={() => handlePriority("Moderate")}
          >
            <p>Moderate Priority</p>
          </div>
          <div className={style.low} onClick={() => handlePriority("Low")}>
            <p>Low Priority</p>
          </div>
        </div>

        <div className={style.checkList}>
          <h4>CheckList(0/{addInputField.length})</h4>
          {addInputField.map((ele, idx) => (
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
              <img
                src={deleteLogo}
                alt="delete-Logo"
                onClick={() => handleDeleteInput(idx)}
              />
            </div>
          ))}

          <div className={style.addNew}>
            <p style={{ cursor: "pointer" }} onClick={handleAddInput}>
              + Add New
            </p>
          </div>
        </div>
        <div className={style.modalButtons}>
         <input type='date' value={date} className={style.selectDate} onChange={(e)=>handleDateChange(e)} placeholder="Select Date"/>
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

export default AddTodoes;
