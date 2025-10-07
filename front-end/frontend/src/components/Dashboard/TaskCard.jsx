import React from 'react';
import { Edit2, Trash2, Clock, CheckCircle2, Circle } from 'lucide-react';

const TaskCard = ({ note, onEdit, onDelete, onToggleStatus }) => {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle2 size={16} className="text-green-600" />;
      case 'in-progress': return <Clock size={16} className="text-blue-600" />;
      default: return <Circle size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className={`${note.color} p-4 sm:p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative group border-2 border-white`}>
      {/* Priority Badge */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
        <span className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full ${getPriorityColor(note.priority)}`}>
          {note.priority.toUpperCase()}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(note)}
          className="p-1 sm:p-1.5 bg-white rounded-lg shadow-md hover:bg-blue-50 transition-colors"
        >
          <Edit2 size={14} className="text-blue-600 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="p-1 sm:p-1.5 bg-white rounded-lg shadow-md hover:bg-red-50 transition-colors"
        >
          <Trash2 size={14} className="text-red-600 sm:w-4 sm:h-4" />
        </button>
      </div>
      
      <div className="mt-7 sm:mt-8">
        <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-gray-800 pr-2 line-clamp-2">
          {note.title || 'Untitled'}
        </h3>
        <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 whitespace-pre-wrap break-words">
          {note.content}
        </p>

        {/* Status Toggle */}
        <button
          onClick={() => onToggleStatus(note.id)}
          className="flex items-center gap-2 w-full bg-white bg-opacity-50 hover:bg-opacity-80 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all mt-2"
        >
          {getStatusIcon(note.status)}
          <span className="text-[10px] sm:text-xs font-medium text-gray-700 capitalize">
            {note.status.replace('-', ' ')}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;