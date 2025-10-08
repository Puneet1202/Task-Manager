import React, { useState } from 'react';
import { User } from 'lucide-react'; // User icon ko import karein

const SimpleDropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
        {/* Button mein ab text ki jagah User icon hai */}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
            <User size={24} className="text-gray-600" />
        </button>

      {/* Tailwind classes ke saath styled menu */}
        {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                My Profile
            </a>
            <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Settings
            </a>
            <button 
                onClick={onLogout} 
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Logout
            </button>
            </div>
        )}
    </div>
  );
};

export default SimpleDropdown;