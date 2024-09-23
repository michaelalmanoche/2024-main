'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import bg from '../images/bg.jpg';
import logo from '../images/logo.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth', { username, password });
      const { token, role_id } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role_id', role_id);

      if (role_id === 1) {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center " style={{ backgroundImage: `url(${bg.src})` }}> 
    
      <Image  src={logo} alt="logo"className=' w-28 h-28 mx-auto mb-2'/> 
        <h1 className="text-2xl text-center  text-white font-light ">
          Sign in to Markads TransCo.
        </h1>
  <div className="w-96 max-w-md p-7 bg-gray-600/90 rounded-lg shadow-lg " style={{ marginBottom: "10rem",marginTop:'-1.3rem', transform: "scale(0.8)" }}>
    <form onSubmit={handleSubmit} className="space-y-4" >
      <div>
        <label className="block text-sm font-medium text-white">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-700 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white">Password</label>
        <input
          type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 mt-1 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-700 text-white"
      />
      <div className="flex justify-end mt-2">
        <a href="#" className="text-sm text-blue-400 hover:underline">Forgot password?</a>
      </div>
    </div>
    {error && <p className="text-sm text-red-600">{error}</p>}
    <button
      type="submit"
      className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Sign in
    </button>
  </form>
</div>


 
</div>
  );
};


export default LoginPage;
