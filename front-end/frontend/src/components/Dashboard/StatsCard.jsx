import React from 'react';

const StatsCard = ({ title, count, icon: Icon, color }) => (
  <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs sm:text-sm text-gray-600 font-medium">{title}</p>
        <p className={`text-xl sm:text-2xl font-bold ${color} mt-1`}>{count}</p>
      </div>
      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${color.replace('text', 'bg').replace('600', '100')} rounded-lg flex items-center justify-center`}>
        {Icon && <Icon size={20} className={color} />}
      </div>
    </div>
  </div>
);

export default StatsCard;