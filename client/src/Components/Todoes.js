import React, { useEffect } from "react";
import style from "./todoes.module.css";
import collapse from "../Images/collapse.png";
import { useState } from "react";
import downArrow from "../Images/downArrow.png";
import AddTodoes from "./AddTodoes";
import bulletPoint from "../Images/bulletPoint.png";
import { BsThreeDots } from "react-icons/bs";
import plus from "../Images/plus.png";
import upArrow from "../Images/upArrow.png";
import DeleteModal from "./DeleteModal";
import EditTodo from "./EditTodo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy from "copy-to-clipboard";

export default function Todoes() {
  const [todoData, setTodoData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDownArrow, setIsDownArrow] = useState(todoData.map(() => false));
  const [isChecklistCollapsed, setIsChecklistCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(Array(100).fill(false));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTodoData, setEditTodoData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/show-todo");
        const data = await response.json();
        console.log(data);
      
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
  
  const handleCheckList = (idx) => {
    setIsDownArrow((prev) => {
      const newArray = [...prev];
      newArray[idx] = !newArray[idx];
      return newArray;
    });
  };
  const handleSaveTodoes = () => {
    setIsModalOpen(true);
  };

  const handleCancelTodoes = () => {
    setIsModalOpen(false);
  };
  const handleAddTodoes = () => {
    setIsModalOpen(true);
  };
  const handleDeleteTodo = async (id) => {
    setIsDeleteOpen(true)
    try {
      const response = await fetch(`http://localhost:4000/delete-todo/${id}`, {
        method: "DELETE",
      });
      console.log(response)
      if (response.ok) {
        // Fetch updated todo list after deletion
        const updatedResponse = await fetch("http://localhost:4000/show-todo");
        const updatedData = await updatedResponse.json();

        if (updatedResponse.ok) {
          setTodoData(updatedData.values);
          
        } else {
          console.error("Failed to fetch updated data:", updatedData);
        }
      } else {
        console.error("Failed to delete todo:", response);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
    
  };
  const handleCancelTodo = () => {
    setIsDeleteOpen(false);
  };
  const handleEditTodo = (todo) => {
    setEditTodoData(todo);
    setIsEditModalOpen(true);
  };
  
  const handleShareTodo = (id) => {
    // Generate the shareable link
    const shareableLink = `${window.location.origin}/todo/${id}`;

    // Copy the link to the clipboard
    copy(shareableLink);

    // Notify the user that the link has been copied
    toast.success('Link Copied')
  };
  
  const handleMenu = (idx) => {
    setIsMenuOpen((prev) => prev.map((val, i) => (i === idx ? !val : false)));
  };
  const handleToggleChecklist = (idx) => {
    setTodoData((prev) => {
      const updatedTodoData = [...prev];
      // updatedTodoData[idx].section = 'Backlog'; // Update the section to 'Backlog'
      return updatedTodoData;
    });
    setIsChecklistCollapsed(true);
    setIsDownArrow(Array(todoData.length).fill(false));
  };
  

  return (
    <>
    <ToastContainer/>
      <div className={style.todoContainer}>
        <div className={style.backlog}>
        <div className={style.todo}>
          <div className={style.todoHeading}>
            <div className={style.heading}>
              <p>Backlog</p>
            </div>
            <div className={style.collapseIcon}>
              <img
                src={collapse}
                alt="collapse-img"
                onClick={handleToggleChecklist}
              />
            </div>
          </div>
          
        </div>
        </div>
        <div className={style.todo}>
          <div className={style.todoHeading}>
            <div className={style.heading}>
              <p>To do</p>
            </div>
            <div className={style.collapseIcon}>
              <img src={plus} onClick={handleAddTodoes} alt="plus-img" />
              <img
                src={collapse}
                alt="collapse-img"
                onClick={handleToggleChecklist}
              />
            </div>
          </div>
          <div className={style.todoList}>
            {todoData.map((ele, idx) => (
              <div className={style.singleTodo}>
                <div className={style.priority}>
                  <p>
                    <img src={bulletPoint} alt="img" />
                    &nbsp;&nbsp;{ele.priority}
                  </p>
                  
                  <h2 className={style.menu}>
                  {isMenuOpen[idx] && (
                    <div
                      className={style.options}
                    >
                      <p onClick={() => handleShareTodo(ele._id)}>Share</p>
                      <p onClick={() => handleEditTodo(ele)}>Edit</p>
                      <p onClick={() => handleDeleteTodo(ele._id)}>Delete</p>
                    </div>
                  )}
                    <BsThreeDots onClick={(e) => handleMenu(idx)} />
                  </h2>
                 
                </div>
                <div className={style.title}>
                  <p>{ele.title}</p>
                </div>
                <div className={style.checkList}>
                  <p>
                    Check List(
                    {ele.checkList.filter((item) => item.completed).length}/
                    {ele.checkList.length})
                  </p>
                  {isDownArrow[idx] ? (
                    <img
                      src={downArrow}
                      alt="down-arrow"
                      onClick={() => handleCheckList(idx)}
                    />
                  ) : (
                    <img
                      src={isChecklistCollapsed ? upArrow : downArrow}
                      alt="toggle-arrow"
                      onClick={() => handleCheckList(idx)}
                    />
                  )}
                </div>
                <div>
                  {isDownArrow[idx] && (
                    <div>
                      {ele.checkList.map((checklistItem, checklistIdx) => (
                        <div
                          key={checklistIdx}
                          className={style.checkListInput}
                        >
                          <div className={style.inputField}>
                            <input
                              type="checkbox"
                              className={style.check}
                              checked={checklistItem.completed}
                              // onChange={() => handleCheckboxChange(index)}
                            />
                            <input
                              className={style.inputArea}
                              type="text"
                              value={checklistItem.description}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={style.listOfPriority}>
                <div className={style.date}>
                  <p>{ele.date.slice(6,10)}</p>
                </div>
                <div className={style.sections}>
                  <div className={style.progress}>
                    <p>Pregress</p>
                  </div>
                  <div className={style.backlogSec}>
                    <p>BackLog</p>
                  </div>
                  <div className={style.done}>
                        Done
                  </div>
                  
                </div>
                
              </div>
              </div>
            ))}
          </div>
        </div>
        <div className={style.progress}>
        <div className={style.todo}>
          <div className={style.todoHeading}>
            <div className={style.heading}>
              <p>In-Progress</p>
            </div>
            <div className={style.collapseIcon}>
              <img
                src={collapse}
                alt="collapse-img"
                onClick={handleToggleChecklist}
              />
            </div>
          </div>
          
        </div>
        </div>
        <div className={style.done}>
        <div className={style.todo}>
          <div className={style.todoHeading}>
            <div className={style.heading}>
              <p>Done</p>
            </div>
            <div className={style.collapseIcon}>
              <img
                src={collapse}
                alt="collapse-img"
                onClick={handleToggleChecklist}
              />
            </div>
          </div>
          
        </div>
        </div>
      </div>
      <>
        {isModalOpen && (
          <AddTodoes
            onConfirm={handleSaveTodoes}
            onCancel={handleCancelTodoes}
          />
        )}
      </>
      <>
        {isDeleteOpen && (
          <DeleteModal
            onConfirm={handleDeleteTodo}
            onCancel={handleCancelTodo}
          />
        )}
      </>
      <>
        {isEditModalOpen && (
          <EditTodo
            todoData={editTodoData}
            onConfirm={() => {
              setIsEditModalOpen(false);
              // Add logic to update the state or refetch todos
            }}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </>
    </>
  );
}
