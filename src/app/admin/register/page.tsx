"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User } from '@/types'; // Adjust the import path based on your file structure
import Modal from './Modal'; // Adjust the import path based on your file structure

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role_id, setRoleId] = useState(''); // Initialize with an empty string
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]); // State to store the list of users
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // State to control register modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control edit modal visibility
  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = useState(false); // State to control confirmation dialog visibility
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State to store the user being edited
  const [userIdToArchive, setUserIdToArchive] = useState<number | null>(null); // State to store the ID of the user to be archived
  const [isAlertVisible, setIsAlertVisible] = useState(false); // State to control alert visibility
  const router = useRouter();

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('/api/register'); // Adjust the endpoint if necessary
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/api/register', { username, password, role_id });
      alert('User registered successfully');
      fetchUsers(); // Refresh the user list after a successful registration
      setIsRegisterModalOpen(false); // Close the modal
      //router.push('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Failed to register user');
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      await axios.put(`/api/register/${selectedUser.id}`, { username, password, role_id });
      alert('User updated successfully');
      fetchUsers(); // Refresh the user list after a successful update
      setIsEditModalOpen(false); // Close the edit modal
    } catch (error) {
      console.error('Error during update:', error);
      setError('Failed to update user');
    }
  };

  const handleArchiveUser = async (id: number) => {
    setUserIdToArchive(id); // Store the ID of the user to be archived
    setIsConfirmArchiveOpen(true); // Open the confirmation dialog
  };

  const confirmArchiveUser = async () => {
    if (userIdToArchive === null) return;

    try {
      // Perform the archive request
      const response = await axios.delete(`/api/register/${userIdToArchive}`, {
        data: { id: userIdToArchive } // Include data if needed by your server
      });

      // Check the response status
      if (response.status === 200) {
        setIsAlertVisible(true); // Show the alert
        setTimeout(() => setIsAlertVisible(false), 3000); // Hide the alert after 3 seconds
        fetchUsers(); // Refresh the user list after archiving
        setIsConfirmArchiveOpen(false); // Close the confirmation dialog
      } else {
        console.error('Unexpected response status:', response.status);
        setError('Failed to archive user');
      }
    } catch (error: any) {
      // Log error details
      console.error('Error during archive:', error.response?.data || error.message);
      setError('Failed to archive user');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registered Users</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-[70rem]" onClick={() => setIsRegisterModalOpen(true)}  >
        Register New User
      </button>

      <table className="rounded-lg mx-auto overflow-hidden mt-4 w-full" style={{ tableLayout: 'fixed', width: '77.9rem', marginLeft: '13.6rem' }}>
      <thead className="bg-blue-500 text-xs text-center">
        <tr className="text-white">
          <th className="px-6 py-2 text-left font-normal rounded-l-lg">Username</th>
          <th className="px-32 py-2 text-left font-normal">Role</th>
          <th className="px-80 py-2 text-left font-normal rounded-r-lg">Actions</th>
        </tr>
      </thead>
  <tbody className="text-xs text-left">
    {users.length > 0 ? (
      users.map((user) => (
        <tr key={user.id} className="border-b">
          <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>
            {user.username}
          </td>
          <td className="px-32 py-2 uppercase" style={{ wordBreak: 'break-word' }}>
            {user.role_id === 1 ? 'Admin' : user.role_id === 2 ? 'User' : 'Unknown'}
          </td>
          <td className="px-4 py-2 uppercase">
            <div className="flex ml-64 justify-center gap-2">
              <button
                onClick={() => { setSelectedUser(user); setIsEditModalOpen(true); }}
                className="relative border border-yellow-500 text-yellow-500 p-2 rounded-md flex items-center justify-center bg-transparent hover:bg-yellow-500 hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="stroke-current text-yellow-500 hover:text-white transition-colors duration-300"
                  fill="none"
                >
                  <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                <div className="absolute bottom-full mb-2 hidden text-xs text-white bg-yellow-500 p-1 rounded-md tooltip">
                  Edit
                </div>
              </button>

              <style jsx>{`.relative:hover .tooltip { display: block;} `}</style>

              <button
                onClick={() => handleArchiveUser(user.id)}
                className="relative border border-red-500 text-red-500 p-2 rounded-md flex items-center justify-center bg-transparent hover:bg-red-500 hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="stroke-current text-red-500 hover:text-white transition-colors duration-300"
                  fill="none"
                >
                  <path d="M14 22H9.62182C7.27396 22 6.10003 22 5.28565 21.2945C4.47127 20.5889 4.27181 19.3991 3.87289 17.0194L2.66933 9.83981C2.48735 8.75428 2.39637 8.21152 2.68773 7.85576C2.9791 7.5 3.51461 7.5 4.58564 7.5H19.4144C20.4854 7.5 21.0209 7.5 21.3123 7.85576C21.6036 8.21152 21.5126 8.75428 21.3307 9.83981L21.0524 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5" stroke="currentColor" stroke-width="1.5" />
                  <path d="M16.5 16.5C16.9915 15.9943 18.2998 14 19 14M21.5 16.5C21.0085 15.9943 19.7002 14 19 14M19 14V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div className="absolute bottom-full mb-2 hidden text-xs text-white bg-red-500 p-1 rounded-md tooltip">
                  Archive
                </div>
              </button>

              <style jsx>{` .relative:hover .tooltip {  display: block; }`}</style>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
          No users found
        </td>
      </tr>
    )}
  </tbody>
</table>

 {/* REgister MOdal */}
      <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)}>
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Register</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select value={role_id} onChange={(e) => setRoleId(e.target.value)} required className="w-full px-3 py-2 border rounded">
                <option value="">Select Role</option>
                <option value="1">Admin</option>
                <option value="2">User</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Register
              </button>
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setIsRegisterModalOpen(false)}>
                Close
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </Modal>

  {/* EDIT MODAL */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Edit User</h2>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select value={role_id} onChange={(e) => setRoleId(e.target.value)} required className="w-full px-3 py-2 border rounded">
                <option value="1">Admin</option>
                <option value="2">User</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Update
              </button>
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setIsEditModalOpen(false)}>
                Close
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </Modal>

 {/* ARCHIVED MODAL*/}
      <Modal isOpen={isConfirmArchiveOpen} onClose={() => setIsConfirmArchiveOpen(false)}>
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Confirm Archive</h2>
          <p>Are you sure you want to archive this user?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={confirmArchiveUser}>
              Yes
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setIsConfirmArchiveOpen(false)}>
              No
            </button>
          </div>
        </div>
      </Modal>

      {isAlertVisible && (
        <div className="fixed bottom-4 right-4 flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700" role="alert">
          <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
          </svg>
          <div>
            <span className="font-medium">Success alert!</span> User archived successfully.
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;