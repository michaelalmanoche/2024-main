"use client"

import { useState } from 'react';

const AdminDashboard = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardClick = (card: string) => {
    setActiveCard(card);
  };

  return (
    <div className='text-center mx-auto px-4 sm:px-6 lg:px-8 ml-56'>
      <h1 className='text-4xl font-bold mb-8'>Admin Dashboard</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div
          className={`bg-white w-64 h-40 p-4 border border-gray-400 mx-auto rounded-3xl cursor-pointer text-left flex flex-col justify-start items-start ${activeCard === 'operators' ? 'bg-blue-700/80 text-white' : 'hover:bg-blue-200 hover:text-white'}`}
          onClick={() => handleCardClick('operators')}
        >
          <div className='flex items-center mb-4'>
            <svg className='w-6 h-6 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path d='M10 2a6 6 0 100 12A6 6 0 0010 2zM2 10a8 8 0 1116 0A8 8 0 012 10z' />
              <path d='M10 4a6 6 0 00-6 6h12a6 6 0 00-6-6z' />
            </svg>
            <h2 className='text-xl font-bold'>Operators</h2>
          </div>
          <p>Total Operators: </p>
        </div>

        <div
          className={`bg-white w-64 h-40 p-4 border border-gray-400 mx-auto rounded-3xl cursor-pointer text-left flex flex-col justify-start items-start ${activeCard === 'vans' ? 'bg-blue-700/80 text-white' : 'hover:bg-blue-200 hover:text-white'}`}
          onClick={() => handleCardClick('vans')}
        >
          <div className='flex items-center mb-4'>
            <svg className='w-6 h-6 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path d='M3 3a1 1 0 000 2h1v10H3a1 1 0 000 2h14a1 1 0 000-2h-1V5h1a1 1 0 000-2H3z' />
            </svg>
            <h2 className='text-xl font-bold'>Vans</h2>
          </div>
          <p>Total Vans: </p>
        </div>

        <div
          className={`bg-white w-64 h-40 p-4 border border-gray-400 mx-auto rounded-3xl cursor-pointer text-left flex flex-col justify-start items-start ${activeCard === 'assignments' ? 'bg-blue-700/80 text-white' : 'hover:bg-blue-200 hover:text-white'}`}
          onClick={() => handleCardClick('assignments')}
        >
          <div className='flex items-center mb-4'>
            <svg className='w-6 h-6 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path d='M5 3a1 1 0 000 2h10a1 1 0 000-2H5zM4 7a1 1 0 000 2h12a1 1 0 000-2H4zM3 11a1 1 0 000 2h14a1 1 0 000-2H3zM2 15a1 1 0 000 2h16a1 1 0 000-2H2z' />
            </svg>
            <h2 className='text-xl font-bold'>Assignments</h2>
          </div>
          <p>Total Assignments: </p>
        </div>

        <div
          className={`bg-white w-64 h-40 p-4 border border-gray-400 mx-auto rounded-3xl cursor-pointer text-left flex flex-col justify-start items-start ${activeCard === 'user-management' ? 'bg-blue-700/80 text-white' : 'hover:bg-blue-200 hover:text-white'}`}
          onClick={() => handleCardClick('user-management')}
        >
          <div className='flex items-center mb-4'>
            <svg className='w-6 h-6 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path d='M10 2a6 6 0 100 12A6 6 0 0010 2zM2 10a8 8 0 1116 0A8 8 0 012 10z' />
              <path d='M10 4a6 6 0 00-6 6h12a6 6 0 00-6-6z' />
            </svg>
            <h2 className='text-xl font-bold'>User Management</h2>
          </div>
          <p>Total Users: </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;