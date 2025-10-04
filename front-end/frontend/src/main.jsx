import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Yahan se createRoot import kiya hai
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/Login.jsx'; // Sahi path check kar lein
import RegisterPage from './pages/RegisterPage.jsx'; // Sahi path check kar lein

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

// Sirf ek baar render karein
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);