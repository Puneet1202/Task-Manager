{/*
import React from 'react';
import { X } from 'lucide-react';

const TaskModal = ({ show, editingNote, newNote, setNewNote, onSave, onClose }) => {
  if (!show) return null;

  const colors = [
    { value: 'bg-yellow-200', name: 'Yellow' },
    { value: 'bg-pink-200', name: 'Pink' },
    { value: 'bg-blue-200', name: 'Blue' },
    { value: 'bg-green-200', name: 'Green' },
    { value: 'bg-purple-200', name: 'Purple' },
    { value: 'bg-orange-200', name: 'Orange' }
  ];

  const statuses = ['pending', 'in-progress', 'completed'];
  const priorities = ['low', 'medium', 'high'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-5 sm:p-7 transform transition-all max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {editingNote ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              placeholder="Enter task title"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              placeholder="Enter task details"
              rows={4}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={newNote.priority}
                onChange={(e) => setNewNote({ ...newNote, priority: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
              >
                {priorities.map(p => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={newNote.status}
                onChange={(e) => setNewNote({ ...newNote, status: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Color Theme
            </label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setNewNote({ ...newNote, color: color.value })}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${color.value} border-3 ${
                    newNote.color === color.value 
                      ? 'border-gray-800 scale-110 shadow-lg ring-2 ring-gray-800' 
                      : 'border-white'
                  } transition-all hover:scale-110 shadow-md`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 sm:px-5 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="flex-1 px-4 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg font-medium text-sm sm:text-base"
            >
              {editingNote ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal; */}





import React from 'react';
import { X } from 'lucide-react';

const TaskModal = ({ show, editingNote, newNote, setNewNote, onSave, onClose }) => {
  if (!show) return null;

  // Colors ka array yahan define karein
  const colors = [
    { value: 'bg-yellow-200', name: 'Yellow' },
    { value: 'bg-pink-200', name: 'Pink' },
    { value: 'bg-blue-200', name: 'Blue' },
    { value: 'bg-green-200', name: 'Green' },
    { value: 'bg-purple-200', name: 'Purple' },
    { value: 'bg-orange-200', name: 'Orange' }
  ];

  const statuses = ['pending', 'in-progress', 'completed'];
  const priorities = ['low', 'medium', 'high'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 transform transition-all max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {editingNote ? 'Edit Task' : 'New Task'}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Task Title *</label>
            <input
              type="text" value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              placeholder="e.g., Finish the report"
              className="w-full px-4 py-2.5 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
            <textarea
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              placeholder="Add more details..." rows={4}
              className="w-full px-4 py-2.5 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Priority</label>
              <select value={newNote.priority} onChange={(e) => setNewNote({ ...newNote, priority: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none"
              >
                {priorities.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
              <select value={newNote.status} onChange={(e) => setNewNote({ ...newNote, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none"
              >
                {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}</option>)}
              </select>
            </div>
          </div>

          {/* --- YAHAN MISSING CODE ADD KIYA GAYA HAI --- */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Color Theme
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setNewNote({ ...newNote, color: color.value })}
                  className={`w-10 h-10 rounded-lg ${color.value} border-2 ${
                    newNote.color === color.value 
                    ? 'ring-2 ring-offset-2 ring-blue-500' 
                    : 'border-transparent'
                  } transition-transform hover:scale-110`}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          
        </div>

        <div className="flex gap-3 pt-8">
          <button onClick={onClose} className="flex-1 px-5 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium">
            Cancel
          </button>
          <button onClick={onSave} className="flex-1 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg">
            {editingNote ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;