import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Clock, CheckCircle2, Circle } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import StatsCard from './StatsCard';
import FilterBar from './FilterBar';

const TaskManagerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [newTask, setNewTask] = useState({
    title: '', content: '', priority: 'medium', status: 'pending', color: 'bg-yellow-200'
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (error) { console.error("Task laane mein error ho gaya:", error); }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setTasks(tasks.filter(task => task._id !== taskId));
      } catch (error) { console.error("Task delete karne mein error:", error); alert("Failed to delete task."); }
    }
  };

  const handleEdit = (taskToEdit) => {
    setEditingNote(taskToEdit);
    setNewTask({
      title: taskToEdit.title, content: taskToEdit.content, priority: taskToEdit.priority,
      status: taskToEdit.status, color: taskToEdit.color || 'bg-yellow-200'
    });
    setShowModal(true);
  };

  const handleSaveTask = async () => {
    if (!newTask.title) return alert('Title is required!');
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      if (editingNote) {
        const response = await axios.put(`http://localhost:5000/api/tasks/${editingNote._id}`, newTask, config);
        setTasks(tasks.map(task => task._id === editingNote._id ? response.data : task));
      } else {
        const response = await axios.post('http://localhost:5000/api/tasks', newTask, config);
        setTasks([response.data, ...tasks]);
      }
      setShowModal(false); setEditingNote(null);
    } catch (error) { console.error("Task save/update karne mein error:", error); alert("Could not save the task."); }
  };

  const handleToggleStatus = async (taskId) => {
    try {
      const statuses = ['pending', 'in-progress', 'completed'];
      const taskToUpdate = tasks.find(task => task._id === taskId);
      if (!taskToUpdate) return;
      const currentIndex = statuses.indexOf(taskToUpdate.status);
      const nextIndex = (currentIndex + 1) % statuses.length;
      const newStatus = statuses[nextIndex];
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:5000/api/tasks/${taskId}/status`,
        { status: newStatus },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setTasks(tasks.map(task => task._id === taskId ? response.data : task));
    } catch (error) { console.error("Status toggle karne mein error:", error); alert("Could not update status."); }
  };

  const openNewTaskModal = () => {
    setEditingNote(null);
    setNewTask({ title: '', content: '', priority: 'medium', status: 'pending', color: 'bg-yellow-200' });
    setShowModal(true);
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <p className="mt-2 text-slate-600">Yahan aapke saare tasks hain!</p>
        </div>
        <button onClick={openNewTaskModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2">
          <Plus size={20} /> New Task
        </button>
      </div>
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Tasks" count={stats.total} icon={Circle} color="text-gray-600" />
        <StatsCard title="Pending" count={stats.pending} icon={Circle} color="text-orange-600" />
        <StatsCard title="In Progress" count={stats.inProgress} icon={Clock} color="text-blue-600" />
        <StatsCard title="Completed" count={stats.completed} icon={CheckCircle2} color="text-green-600" />
      </div>
      <div className="mt-8">
        <FilterBar filterStatus={filterStatus} setFilterStatus={setFilterStatus} filterPriority={filterPriority} setFilterPriority={setFilterPriority} />
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard key={task._id} note={task} onEdit={handleEdit} onDelete={() => handleDelete(task._id)} onToggleStatus={() => handleToggleStatus(task._id)} />
          ))
        ) : ( <div className="col-span-full text-center py-12"><h3 className="text-lg font-semibold text-gray-600">No tasks found.</h3></div> )}
      </div>
      <TaskModal show={showModal} editingNote={editingNote} newNote={newTask} setNewNote={setNewTask} onSave={handleSaveTask} onClose={() => { setShowModal(false); setEditingNote(null); }} />
    </div>
  );
};
export default TaskManagerDashboard;