import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios'; // Axios import karein

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [name, setname] = useState('');

  const handleSubmit =  async(e) => {
    e.preventDefault();
    // Yahan hum baad mein API call karenge
    console.log({ email, password ,name });

    const userData={
        name:name,
        email:email,
        password:password
    };

   
    try{
                const response = await axios.post('http://localhost:5000/api/register', userData);
                console.log('Backend se response:', response.data);
                alert(response.data.message);


    }catch (error) {
    // Is line ko update karein
    console.error('Axios error details:', error.response); 
    
    // Server se aaye error message ko alert mein dikhayein
    if (error.response) {
        alert(error.response.data.message);
    } else {
        alert('Registration fail ho gaya! Server se connect nahi ho pa raha.');
    }

  }
    finally {
        // ✅ YEH HAMESHA CHALEGA (SUCCESS HO YA ERROR)
        // Isliye fields clear karne ka logic yahan rakhein
        setEmail('');
        setPassword('');
        setname('');
    }
}

  return ( <>
     <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>


              <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded text-white border border-gray-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
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
     Do you have an account?{' '}
  <Link to="/login" className="text-cyan-400 hover:underline">
    login
  </Link>
</p>
      </div>
    </div>
    </>
  );
}

export default RegisterPage;