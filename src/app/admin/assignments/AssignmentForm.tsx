"use client"

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Operator, Van } from '@/types';
import '../assignments/style.module.css'; // Import the CSS file

const AssignmentForm = () => {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [vans, setVans] = useState<Van[]>([]);
  const [assignments, setAssignments] = useState([]);
  const [assignment, setAssignment] = useState<{ id: number | null; operator_id: number; van_ids: number[] }>({ id: null, operator_id: 0, van_ids: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const totalPages = Math.ceil(assignments.length / rowsPerPage);
  const [isVanDropdownOpen, setIsVanDropdownOpen] = useState(false);

  const toggleVanDropdown = () => {
    setIsVanDropdownOpen(!isVanDropdownOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [operatorsData, vansData, assignmentsData] = await Promise.all([
        axios.get('/api/operators'),
        axios.get('/api/vans'),
        axios.get('/api/assignments')
      ]);
      setOperators(operatorsData.data);
      setVans(vansData.data);
      setAssignments(assignmentsData.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Check if the current page has rows
    if (!hasRows(currentPage, rowsPerPage, assignments) && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, rowsPerPage, assignments]);

  const hasRows = (currentPage: number, rowsPerPage: number, data: any[]) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex).length > 0;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentRows = assignments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      const vanId = Number(value);
      setAssignment(prev => ({
        ...prev,
        van_ids: checked ? [...prev.van_ids, vanId] : prev.van_ids.filter(id => id !== vanId)
      }));
    } else {
      setAssignment({ ...assignment, [name]: Number(value) });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && assignment.id) {
        await axios.put(`/api/assignments`, assignment);
        alert('Assignment updated successfully');
      } else {
        await axios.post('/api/assignments', assignment);
        alert('Assignment created successfully');
      }
      setAssignment({ id: null, operator_id: 0, van_ids: [] });
      setIsEditing(false);
      const { data } = await axios.get('/api/assignments');
      setAssignments(data);
    } catch (error) {
      alert('Failed to save assignment');
    }
  };

  const handleEdit = (id: number) => {
    const assignmentToEdit = assignments.find((assignment: any) => assignment.id === id);
    if (assignmentToEdit) {
      setAssignment(assignmentToEdit);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/assignments`, { data: { id } });
      alert('Assignment deleted successfully');
      const { data } = await axios.get('/api/assignments');
      setAssignments(data);
    } catch (error) {
      alert('Failed to delete assignment');
    }
  };

  const handleCancel = () => {
    setAssignment({ id: null, operator_id: 0, van_ids: [] });
    setIsEditing(false);
  };

  //const assignedOperatorIds = assignments.map((assignment: any) => assignment.operator_id);
  const assignedVanIds = assignments.map((assignment: any) => assignment.van_id);

  //const availableOperators = operators.filter(operator => !assignedOperatorIds.includes(operator.id) || operator.id === assignment.operator_id);
  const availableVans = vans.filter(van => !assignedVanIds.includes(van.id) || assignment.van_ids.includes(van.id));

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-4 sm:p-6 lg:p-8" style={{ marginLeft: '-46.1rem', marginTop: '-2rem' }}>
        <h2 className="text-2xl font-normal text-gray-600">Van Operator Assignment</h2>
        <p className="text-gray-500 dark:text-gray-400">Manage and Assign Operators to Vans</p>
      </div>

      <div className="flex flex-col w-full max-w-6xl" style={{ marginLeft: '10rem' }}>

      <div className="w-full p-4">
      <form onSubmit={handleSubmit} className="p-6 rounded-3xl w-full mt-[-4rem] ml-[7rem]">
        
        <div className="flex mb-4 space-x-4 ">
          <div className="w-52 ml-80">
            <select
              name="operator_id"
              value={assignment.operator_id}
              onChange={handleChange}
              required
              className=" cursor-pointer block w-full bg-white border border-gray-300 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Operator</option>
              {operators.map((operator) => (
                <option key={operator.id} value={operator.id}>
                  {operator.firstname} {operator.lastname}
                </option>
              ))}
            </select>
          </div>

          <div className="w-52 ml-auto relative">
       
        <div className="block w-full bg-white border border-gray-300 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer" onClick={toggleVanDropdown} >
          Available Vans
        </div>
        
        {isVanDropdownOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1">
            {availableVans.map((van) => (
              <div key={van.id} className="flex items-center mb-2 px-4 py-2">
                <input
                  type="checkbox"
                  name="van_ids"
                  value={van.id}
                  checked={assignment.van_ids.includes(van.id)}
                  onChange={handleChange}
                  className="mr-2"
                />
                {van.plate_number}
              </div>
            ))}
          </div>
        )}
      </div>

          <div className="flex flex-row justify-start space-x-2">
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700" style={{marginLeft:'1rem'}}>
              {isEditing ? 'Update Assignment' : 'Create Assignment'}
            </button>
            {isEditing && (
              <button type="button" className="bg-red-500 text-white py-2 px-4 rounded  hover:bg-red-700 " onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
      </div>

      <div className="inline-block max-w-full relative">
        <table className="rounded-lg mx-auto overflow-hidden mt-[-3rem] w-full" style={{ tableLayout: 'fixed', width: '79rem', marginLeft: '-1rem' }}>
          <thead className="bg-blue-500 text-xs text-center">
            <tr className="text-white">
              <th className="px-6 py-2 text-left font-normal rounded-l-lg">Operator</th>
              <th className="px-32 py-2 text-left font-normal">Van</th>
              <th className="px-80 py-2 text-left font-normal rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs text-left">
            {currentRows.map((assignment: any) => (
              <tr key={assignment.id} className="border-b">
                <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>
                  {operators.find((operator) => operator.id === assignment.operator_id)?.firstname} {operators.find((operator) => operator.id === assignment.operator_id)?.lastname}
                </td>
                <td className="px-32 py-2 uppercase" style={{ wordBreak: 'break-word' }}>
                  {vans.find((van) => van.id === assignment.van_id)?.plate_number}
                </td>
                <td className="px-4 py-2 uppercase">
                  <div className="flex ml-64 justify-center gap-2">
                    <button
                      onClick={() => handleEdit(assignment.id)}
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
                      onClick={() => handleDelete(assignment.id)}
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
                        Delete
                      </div>
                    </button>

                    <style jsx>{` .relative:hover .tooltip {  display: block; }`}</style>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{/* PAGINATION */}
<nav className="pagination-bottom flex items-center -space-x-px ml-[700px] mb-10" aria-label="Pagination">
  <button
    type="button"
    className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center 
    items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-blue-300
     text-gray-800 hover:bg-blue-500 hover:text-white focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
    aria-label="Previous"
    onClick={handlePrevious}
    disabled={currentPage === 1}
  >
    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m15 18-6-6 6-6"></path>
    </svg>
    <span className="hidden sm:block">Previous</span>
  </button>
  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      type="button"
      className={`min-h-[38px] min-w-[38px] flex justify-center items-center border border-blue-300
         py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none
          ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-gray-800 hover:text-white hover:bg-blue-500'}`}
      aria-current={currentPage === index + 1 ? 'page' : undefined}
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </button>
  ))}
  <button
    type="button"
    className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center
     gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-blue-300 text-gray-800
      hover:bg-blue-500 hover:text-white  focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
    aria-label="Next"
    onClick={handleNext}
    disabled={currentPage === totalPages}
  >
    <span className="hidden sm:block">Next</span>
    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m9 18 6-6-6-6"></path>
    </svg>
  </button>
</nav>

</div>
    </div>
  );
};

export default AssignmentForm;