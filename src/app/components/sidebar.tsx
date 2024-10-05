"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../images/logo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  

  useEffect(() => {
    // Retrieve the active link from local storage
    const storedActiveLink = localStorage.getItem('activeLink');
    if (storedActiveLink) {
      setActiveLink(storedActiveLink);
    }
  }, []);

  useEffect(() => {
    // Store the active link in local storage
    localStorage.setItem('activeLink', activeLink);
  }, [activeLink]);

  return (
    <>
      {/* Toggle button for small screens */}
      <button className="md:hidden h-12 w-12 p-2 bg-black flex items-center justify-center fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

    <div className={`bg-custom-gray-2 border-r border-gray-200 text-black h-screen w-56 flex flex-col justify-between p-4 fixed top-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
      <div>
        <div className="flex flex-col items-center space-y-2 p-2 " style={{ marginTop: '-0.5rem' }}>
          <Image src={logo} alt="logo" className='w-20' />
          <span className="text-xl font-bold text-center">Markads TransCo</span>
        </div>
        <hr className="border" />
        <nav className="mt-4">
          <h1 className='mb-3'>Menu</h1>

          <Link href="/admin"
            className={`relative flex items-center space-x-2 p-2 rounded-md group cursor-pointer ${activeLink === '/admin' ? 'bg-custom-white text-custom-black' : 'text-gray-400 hover:bg-custom-white hover:text-custom-black'}`}
            onClick={() => setActiveLink('/admin')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" className={`w-5 h-5 ${activeLink === '/admin' ? 'stroke-custom-black ' : 'stroke-gray-400 group-hover:stroke-custom-black group-hover:fill-'}`}>
              <path d="M8.9995 22L8.74887 18.4911C8.61412 16.6046 10.1082 15 11.9995 15C13.8908 15 15.3849 16.6046 15.2501 18.4911L14.9995 22" stroke="currentColor" stroke-width="1.5" />
              <path d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            </svg>
            <span className="text-sm font-bold">Dashboard</span>
      </Link>

          <Link href="/admin/operators"
                className={`relative flex items-center space-x-2 p-2 rounded-md mt-2 group cursor-pointer ${activeLink === '/admin/operators' ? 'bg-custom-white text-custom-black' : 'text-gray-400 hover:bg-custom-white hover:text-custom-black'}`}
                onClick={() => setActiveLink('/admin/operators')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className={`w-5 h-5 ${activeLink === '/admin/operators' ? 'stroke-custom-black' : 'group-hover:stroke-custom-black'}`}>
                  <path d="M20.774 18C21.5233 18 22.1193 17.5285 22.6545 16.8691C23.7499 15.5194 21.9513 14.4408 21.2654 13.9126C20.568 13.3756 19.7894 13.0714 19 13M18 11C19.3807 11 20.5 9.88071 20.5 8.5C20.5 7.11929 19.3807 6 18 6" strokeLinecap="round" />
                  <path d="M3.22596 18C2.47666 18 1.88067 17.5285 1.34555 16.8691C0.250089 15.5194 2.04867 14.4408 2.73465 13.9126C3.43197 13.3756 4.21058 13.0714 5 13M5.5 11C4.11929 11 3 9.88071 3 8.5C3 7.11929 4.11929 6 5.5 6" strokeLinecap="round" />
                  <path d="M8.0838 15.1112C7.06203 15.743 4.38299 17.0331 6.0147 18.6474C6.81178 19.436 7.69952 20 8.81563 20H15.1844C16.3005 20 17.1882 19.436 17.9853 18.6474C19.617 17.0331 16.938 15.743 15.9162 15.1112C13.5201 13.6296 10.4799 13.6296 8.0838 15.1112Z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.5 7.5C15.5 9.433 13.933 11 12 11C10.067 11 8.5 9.433 8.5 7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5Z" />
                </svg>
                <span className="text-sm font-bold">Operators/Drivers</span>
          </Link>

      

          <Link href="/admin/vans"
                className={`relative flex items-center space-x-2 p-2 rounded-md mt-2 group cursor-pointer ${activeLink === '/admin/vans' ? 'bg-custom-white text-custom-black' : 'text-gray-400 hover:bg-custom-white hover:text-custom-black'}`}
                onClick={() => setActiveLink('/admin/vans')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="gray" className={`w-5 h-5 ${activeLink === '/admin/vans' ? 'stroke-custom-black' : 'group-hover:stroke-custom-black'}`}>
                  <path d="M19.1 18H20.5C20.9659 18 21.1989 18 21.3827 17.9239C21.6277 17.8224 21.8224 17.6277 21.9239 17.3827C22 17.1989 22 16.9659 22 16.5M19.1 18V11.3955C19.1 9.32395 18.7412 8.25904 17.3783 6.71082C15.5455 4.62893 14.3713 4 11.5699 4H6.22222C4.23185 4 3.23666 4 2.61833 4.68342C2 5.36683 2 6.46678 2 8.66667V13.3333C2 15.5332 2 16.6332 2.61833 17.3166C3.23666 18 4.23185 18 6.22222 18H7M19.1 18H11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="9" cy="18" r="2" stroke-width="1.5" />
                </svg>
                <span className="text-sm font-bold">Vans</span>
          </Link>

          <Link href="/admin/assignments"
                className={`relative flex items-center space-x-2 p-2 rounded-md mt-2 group cursor-pointer ${activeLink === '/admin/assignments' ? 'bg-custom-white text-custom-black' : 'text-gray-400 hover:bg-custom-white hover:text-custom-black'}`}
                onClick={() => setActiveLink('/admin/assignments')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="gray" className={`w-5 h-5 ${activeLink === '/admin/assignments' ? 'stroke-custom-black' : 'group-hover:stroke-custom-black'}`}>
                  <path d="M4 3H3C2.44772 3 2 3.44772 2 4V18L3.5 21L5 18V4C5 3.44772 4.55228 3 4 3Z" stroke-width="1.5" stroke-linejoin="round" />
                  <path d="M21 12.0013V8.00072C21 5.64336 21 4.46468 20.2678 3.73234C19.5355 3 18.357 3 16 3H13C10.643 3 9.46447 3 8.73223 3.73234C8 4.46468 8 5.64336 8 8.00072V16.0019C8 18.3592 8 19.5379 8.73223 20.2703C9.35264 20.8908 10.2934 20.9855 12 21" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 7H17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 11H17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14 19C14 19 15.5 19.5 16.5 21C16.5 21 18 17 22 15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M2 7H5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span className="text-sm font-bold">Assignments</span>
          </Link>

          <Link href="/admin/assignDriver"
            className={`relative flex items-center space-x-2 p-2 rounded-md mt-2 group cursor-pointer ${activeLink === '/admin/assignDriver' ? 'bg-custom-white text-custom-black' : 'text-gray-400 hover:bg-custom-white hover:text-custom-black'}`}
            onClick={() => setActiveLink('/admin/assignDriver')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="gray" className={`w-5 h-5 ${activeLink === '/admin/assignDriver' ? 'stroke-custom-black' : 'group-hover:stroke-custom-black'}`}>
              <path d="M4 3H3C2.44772 3 2 3.44772 2 4V18L3.5 21L5 18V4C5 3.44772 4.55228 3 4 3Z" stroke-width="1.5" stroke-linejoin="round" />
              <path d="M21 12.0013V8.00072C21 5.64336 21 4.46468 20.2678 3.73234C19.5355 3 18.357 3 16 3H13C10.643 3 9.46447 3 8.73223 3.73234C8 4.46468 8 5.64336 8 8.00072V16.0019C8 18.3592 8 19.5379 8.73223 20.2703C9.35264 20.8908 10.2934 20.9855 12 21" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 7H17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 11H17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14 19C14 19 15.5 19.5 16.5 21C16.5 21 18 17 22 15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 7H5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span className="text-sm font-bold">Assign Driver</span>
          </Link>

          <Link href="/admin/register"
                className={`relative flex items-center space-x-2 p-2 rounded-md mt-2 group cursor-pointer ${activeLink === '/admin/register' ? 'bg-custom-white text-custom-black' : 'text-gray-400 hover:bg-custom-white hover:text-custom-black'}`}
                onClick={() => setActiveLink('/admin/register')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="gray" className={`w-5 h-5 ${activeLink === '/admin/register' ? 'stroke-custom-black' : 'group-hover:stroke-custom-black'}`}>
                  <path d="M5.18007 15.2964C3.92249 16.0335 0.625213 17.5386 2.63348 19.422C3.6145 20.342 4.7071 21 6.08077 21H13.9192C15.2929 21 16.3855 20.342 17.3665 19.422C19.3748 17.5386 16.0775 16.0335 14.8199 15.2964C11.8709 13.5679 8.12906 13.5679 5.18007 15.2964Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C12.2091 3 14 4.79086 14 7Z" stroke-width="1.5" />
                  <path d="M19.5 4V9M22 6.5L17 6.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span className="text-sm font-bold">User Management</span>
          </Link>

          <Link href="/admin/Report"
      className={`relative flex items-center space-x-2 p-2 rounded-md mt-2 group cursor-pointer ${activeLink === '/admin/Schedule' ? 'bg-custom-white text-custom-black' : 'text-gray-400 hover:bg-custom-white hover:text-custom-black'}`}
      onClick={() => setActiveLink('/admin/Schedule')}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" className={`w-5 h-5 ${activeLink === '/admin/Schedule' ? 'stroke-custom-black' : 'stroke-gray-400 group-hover:stroke-custom-black'}`}>
          <path d="M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z" stroke="currentColor" stroke-width="1.5" />
          <path d="M11.992 16H12.001" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 13L12 8.99997" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span className="text-sm font-bold">Report</span>
</Link>
        </nav>
      </div>
    </div>
    </>
  );
};

export default Sidebar;