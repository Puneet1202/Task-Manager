import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Router imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Page and Component imports
import App from './App.jsx'; // Iski zaroorat shayad na pade, aap check kar lein
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Dashboard from './pages/Dashboard.jsx'; // Dashboard ko import karein
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home.jsx';

// Router ka setup
const router = createBrowserRouter([
    {
        // Default route: Agar user logged in hai to dashboard, warna login par jayega
        path: '/',
        element: (
            <Home />
        )
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        // Dashboard ka route bhi protect karein
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        )
    }
]);

// App ko render karein
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);