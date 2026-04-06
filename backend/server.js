require("dotenv").config();


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean
});

const Task = mongoose.model('Task', taskSchema);

// Routes

// Test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// Get all tasks with pagination
app.get("/tasks", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    Task.find().skip(skip).limit(limit),
    Task.countDocuments(),
  ]);

  res.json({
    tasks,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

// Add task
app.post("/tasks", async (req, res) => {
  const newTask = new Task({
    text: req.body.text,
    completed: false
  });

  await newTask.save();
  res.json(newTask);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

// Update task (mark complete)
app.put("/tasks/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      text: req.body.text,
      completed: req.body.completed,
    },
    { new: true }
  );
  res.json(updatedTask);
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});