const express = require('express');
const router = express.Router();
const Task = require('../models/task.model');
const { verifyToken } = require('../middlewares/auth.middleware.js');

router.get('/tasks', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) { res.status(500).json({ message: 'Server error while fetching tasks' }); }
});

router.post('/tasks', verifyToken, async (req, res) => {
    try {
        const { title, content, status, priority } = req.body;
        if (!title) { return res.status(400).json({ message: 'Title is required' }); }
        const newTask = new Task({ title, content, status, priority, user: req.user.id });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) { res.status(500).json({ message: 'Server error while creating task' }); }
});

router.put('/tasks/:id', verifyToken, async (req, res) => {
    try {
        const { title, content, priority, status } = req.body;
        if (!title) { return res.status(400).json({ message: "Title is required" }); }
        const task = await Task.findById(req.params.id);
        if (!task) { return res.status(404).json({ message: "Task not found" }); }
        if (task.user.toString() !== req.user.id) { return res.status(401).json({ message: "User not authorized" }); }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, content, priority, status }, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) { res.status(500).json({ message: "Server error while updating task" }); }
});

router.delete('/tasks/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) { return res.status(404).json({ message: "Task not found" }); }
        if (task.user.toString() !== req.user.id) { return res.status(401).json({ message: "User not authorized" }); }
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) { res.status(500).json({ message: "Server error while deleting task" }); }
});

router.patch('/tasks/:id/status', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        if (!['pending', 'in-progress', 'completed'].includes(status)) { return res.status(400).json({ message: "Invalid status" }); }
        const task = await Task.findById(req.params.id);
        if (!task) { return res.status(404).json({ message: "Task not found" }); }
        if (task.user.toString() !== req.user.id) { return res.status(401).json({ message: "User not authorized" }); }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status: status }, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) { res.status(500).json({ message: "Server error while updating status" }); }
});

module.exports = router;