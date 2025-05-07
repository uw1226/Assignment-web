const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory task storage
let tasks = [];
let nextId = 1;

// Add a task
app.post('/addTask', (req, res) => {
  const { taskName } = req.body;
  if (!taskName) {
    return res.status(400).json({ error: 'taskName is required' });
  }
  const task = { id: nextId++, taskName };
  tasks.push(task);
  res.status(201).json(task);
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Delete a task by ID
app.delete('/task/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const deletedTask = tasks.splice(index, 1)[0];
  res.json(deletedTask);
});

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}');
});