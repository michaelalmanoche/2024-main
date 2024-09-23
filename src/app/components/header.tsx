"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import logo from '../images/logo.png';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white p-2 flex justify-between items-center border-b shadow-sm border-gray-200">
  <div className="">
    <span className="text-gray-900 ml-64 font-bold text-lg">Welcome back, Admin</span>
  </div>

  <div className="flex items-center space-x-2 relative">
    <div className="h-6 border-l border-gray-300"></div>
    <img
      alt="Admin"
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
      className="w-8 h-8 rounded-full"
    />

    <button onClick={toggleDropdown} className="focus:outline-none flex items-center space-x-3 ">
    <div className="flex flex-col items-start">
      <span className="text-gray-900 font-medium text-sm font-sans" style={{marginTop:'-0.3rem'}}>James Florence</span>
      <span className="text-gray-400 font-medium  text-xs font-sans">Admin</span>
    </div>
      <svg style={{marginTop:'-0.2rem'}}
      xmlns="http://www.w3.org/2000/svg"color='gray' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>

    {dropdownOpen && (
      <div className="absolute right-0 mt-20 w-32 bg-white border border-gray-200 rounded-md shadow-lg ">
        <Link href="/" className="block px-4 py-1 text-gray-800 text-sm hover:bg-gray-100">
          Logout
        </Link>
      </div>
    )}
  </div>
</header>
  );
};

export default Header;