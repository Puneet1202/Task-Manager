import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios'; // Axios import karein


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit =  async(e) => {
    e.preventDefault();
    // Yahan hum baad mein API call karenge
    console.log({ email, password });



    const loginData ={ email, password };   
    try{
      const response = await axios.post('http://localhost:5000/api/login', loginData);
      console.log('Backend se response:', response.data);
      alert(response.data.message);
      const {token} = response.data;
      localStorage.setItem('token', token);
       console.log("Token saved to localStorage:", token); // Check karne ke liye
  

    }catch (error) {
      // Is line ko update karein
      console.error('Axios error details:', error.response);
      // Server se aaye error message ko alert mein dikhayein
      if (error.response) {
          alert(error.response.data.message);
      } else {
          alert('Login fail ho gaya! Server se connect nahi ho pa raha.');
      }

    
    } finally {
        // ✅ YEH HAMESHA CHALEGA (SUCCESS HO YA ERROR)
        // Isliye fields clear karne ka logic yahan rakhein
        setEmail('');
        setPassword('');
    }

  };

  return (
    <>
     <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-900 ">
     
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded text-white border border-gray-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded text-white border border-gray-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold p-3 rounded">
            Login
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
  Don't have an account?{' '}
  <Link to="/register" className="text-cyan-400 hover:underline">
    Register
  </Link>
</p>
      </div>
    </div>
    </>
  );
}

export default LoginPage;