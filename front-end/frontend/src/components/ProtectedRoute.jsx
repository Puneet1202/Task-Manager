import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check karo ki localStorage mein token hai ya nahi
    const token = localStorage.getItem('token');

    if (!token) {
        // Agar token nahi hai, to user ko login page par redirect kar do
        return <Navigate to="/login" />;
    }

    // Agar token hai, to uss component ko dikhao jo iske andar hai (e.g., Dashboard)
    return children;
};

export default ProtectedRoute;