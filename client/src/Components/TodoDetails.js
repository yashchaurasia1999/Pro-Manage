import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./todoDetails.module.css";
import dashboardLogo from "../Images/dashboardLogo.png";
import bulletPoint from "../Images/bulletPoint.png";
export default function TodoDetails() {
  const { id } = useParams();
  const [todoDetails, setTodoDetails] = useState({});
  const [checklist, setChecklist] = useState([]);
  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/todo-details/${id}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setTodoDetails(data.todoDetails);
          setChecklist(data.todoDetails.checkList || []); // Set checklist here
        } else {
          console.error("Failed to fetch todo details:", data);
        }
      } catch (error) {
        console.error("Error fetching todo details:", error);
      }
    };

    fetchTodoDetails();
  }, [id]);
  const handleCheckboxChange = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].completed = !updatedChecklist[index].completed;
    setChecklist(updatedChecklist);
  };
  const getCompletedChecklistCount = () => {
    const completedCount = checklist.filter(item => item.completed).length;
    return `${completedCount}/${checklist.length}`;
  };
  if (!todoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.header}>
          <p>
            <img src={dashboardLogo} alt="dashboard-logo" />
            &nbsp;&nbsp;Pro Manager
          </p>
        </div>
        <div className={style.singleTodo}>
          <div className={style.todoContainer}>
            <div className={style.todoes}>
              <div className={style.todo}>
                <div className={style.priority}>
                  <p>
                    <img src={bulletPoint} />
                    &nbsp;&nbsp;{todoDetails.priority}
                  </p>
                </div>
                <div className={style.title}>
                  <p>{todoDetails.title}</p>
                </div>
                <div className={style.checkListHeading}>
                  <p>CheckList {getCompletedChecklistCount()}</p>
                </div>
                {
                    checklist.map((item, index) => (
                        <div key={index} className={style.checkListInput}>
                          <div className={style.inputField}>
                            <input
                              type="checkbox"
                              className={style.check}
                              checked={item.completed}
                              onChange={() => handleCheckboxChange(index)}
                            />
                            <input
                              className={style.inputArea}
                              type="text"
                              value={item.description}
                              readOnly
                            />
                          </div>
                        </div>
                      ))
                    
                }
            
                <div className={style.dueDate}>
                    <p>Due Date</p>&nbsp;&nbsp;&nbsp;
                    <p>{todoDetails.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
