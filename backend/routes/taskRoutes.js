const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const isLoggedIn=require('../middleware/middleware')
const taskModel = require('../models/taskModel')
const router=express.Router()
router.post('/add-todo', isLoggedIn, async (req, res) => {
  try {
      const { todoText, priority, date, data } = req.body;
      // const createdBy = req.user._id;

      const formattedCheckList = data.map(item => ({
          description: item.description,
          completed: item.completed || false,
      }));

      const task = new taskModel({
          title: todoText,
          priority,
          date,
          checkList: formattedCheckList,
      });

      const savedTask = await task.save();

      res.json({
          status: 'success',
          taskData: savedTask,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});


  router.put('/update-todo/:id',isLoggedIn, async (req, res) => {
    
    const { id } = req.params;
    const { title, priority, date, data } = req.body;
    // console.log(data)
    // console.log(title+" "+priority+" "+date+" "+formattedCheckList)
    const formattedCheckList = data.map(item => ({
        description: item.description,
        completed: item.completed || false,
      }));
    //   console.log(formattedCheckList)
    try {
      const updatedTodo = await taskModel.findByIdAndUpdate(
        id,
        { title, priority, date, checkList:formattedCheckList },
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      return res.status(200).json({ message: 'Todo updated successfully', todo: updatedTodo });
    } catch (error) {
      console.error('Error updating todo:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  

router.get('/show-todo',async(req,res)=>{
    try {
      const email=req.email;
      const data = await taskModel.find({email});

        res.json({
            status:'ok',
            values:data
        })
    } catch (error) {
        console.log(error)
    }
})
router.delete('/delete-todo/:id', async (req, res) => {
    try {
      const deletedTodo = await taskModel.findByIdAndDelete(req.params.id);
      if (!deletedTodo) {
        return res.status(404).json({ status: 'error', message: 'Todo not found' });
      }
      res.json({ status: 'ok', message: 'Todo deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });
  //public route
  router.get('/todo-details/:id', async (req, res) => {
    try {
      const { id } = req.params;
        
      // Fetch todo details by ID
      const todoDetails = await taskModel.findById(id);
        // console.log(todoDetails)
      if (!todoDetails) {
        return res.status(404).json({ status: 'error', message: 'Todo not found' });
      }
  
      // Respond with todo details
      res.json({ status: 'success', todoDetails });
    } catch (error) {
      console.error('Error fetching todo details:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });
  router.put("/update-priority/:taskId", async (req, res) => {
    const { taskId } = req.params;
    const { priority } = req.body;
  
    try {
      const updatedTask = await taskModel.findByIdAndUpdate(
        taskId,
        { priority },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.json({ message: "Priority updated successfully", updatedTask });
    } catch (error) {
      console.error("Error updating priority:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  router.get('/show-todo',isLoggedIn, async (req, res) => {
    try {
      const { dateFilter } = req.query;
      let query = {};
  
      if (dateFilter === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        query = { createdAt: { $gte: today } };
      } else if (dateFilter === 'thisWeek') {
        // Implement logic to filter by this week
        // ...
      }
  
      // Continue with similar conditions for other date filters
  
      const todos = await Todo.find(query);
      res.json({ values: todos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports=router;