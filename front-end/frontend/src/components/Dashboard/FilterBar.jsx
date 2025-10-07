import React from 'react';
import { Filter } from 'lucide-react';

const FilterBar = ({ filterStatus, setFilterStatus, filterPriority, setFilterPriority }) => (
  <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-100 mb-4 sm:mb-6">
    <div className="space-y-3">
      {/* Status Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={18} className="text-gray-600" />
        <span className="text-xs sm:text-sm font-medium text-gray-700 min-w-fit">Status:</span>
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'in-progress', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                filterStatus === status
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="w-[18px]"></div>
        <span className="text-xs sm:text-sm font-medium text-gray-700 min-w-fit">Priority:</span>
        <div className="flex gap-2 flex-wrap">
          {['all', 'high', 'medium', 'low'].map((priority) => (
            <button
              key={priority}
              onClick={() => setFilterPriority(priority)}
              className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                filterPriority === priority
                  ? priority === 'high' 
                    ? 'bg-red-600 text-white shadow-md'
                    : priority === 'medium'
                    ? 'bg-yellow-600 text-white shadow-md'
                    : priority === 'low'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default FilterBar;