"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface Driver {
  id: number;
  firstname: string;
  lastname: string;
}

interface Assignment {
  id: number;
  Operator: {
    id: number;
    firstname: string;
    lastname: string;
  };
  Van: {
    id: number;
    plate_number: string;
  };
  driver_id: number | null;
  Driver?: {
    id: number;
    firstname: string;
    lastname: string;
  };
  archived: boolean;
}

interface AssignDriversFormProps {
  drivers: Driver[];
}

const AssignDriversForm: React.FC<AssignDriversFormProps> = ({ drivers }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<number | null>(null);

  const fetchAssignments = async () => {
    try {
      const { data } = await axios.get('/api/assignments');
      console.log('Fetched assignments:', data); // Log the fetched data
      setAssignments(data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleAssignDriver = async () => {
    if (selectedAssignment === null || selectedDriver === null) {
      alert('Please select an assignment and a driver.');
      return;
    }

    try {
      await axios.post('/api/assignments/assignDriver', {
        assignment_id: selectedAssignment,
        driver_id: selectedDriver,
      });
      alert('Driver assigned successfully');
      setEditingAssignment(null);
      fetchAssignments();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert('Failed to assign driver');
      }
    }
  };

  const handleEditAssignment = (assignmentId: number) => {
    setEditingAssignment(assignmentId);
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      setSelectedAssignment(assignment.id);
      setSelectedDriver(assignment.driver_id);
    }
  };

  const handleArchiveAssignment = async (assignmentId: number) => {
    try {
      await axios.put('/api/assignments', {
        id: assignmentId,
        archived: true,
      });
      alert('Assignment archived successfully');
      fetchAssignments();
    } catch (error) {
      alert('Failed to archive assignment');
    }
  };

  // Filter out drivers who are already assigned to a van
  const assignedDriverIds = assignments.map(assignment => assignment.driver_id).filter(id => id !== null);
  const availableDrivers = drivers.filter(driver => !assignedDriverIds.includes(driver.id));

  // Filter assignments to only include those with a driver and not archived
  const assignmentsWithDrivers = assignments.filter(assignment => assignment.driver_id !== null && !assignment.archived);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-4 sm:p-6 lg:p-8" style={{ marginLeft: '-46.1rem', marginTop: '-2rem' }}>
        <h2 className="text-2xl font-normal text-gray-600">Assign Drivers to Vans</h2>
        <p className="text-gray-500 dark:text-gray-400">Manage and Assign Drivers to Vans with Operators</p>
      </div>
      
      <div className="p-4">
      <form onSubmit={handleAssignDriver} className="p-6 rounded-3xl mt-[-4rem] ml-96 ">
      <div className="flex mb-4 space-x-4">
        <div className="w-52 ml-80">
          <label className="block text-gray-700 mb-2">Select Assignment</label>
          <select
            className="cursor-pointer block w-full bg-white border border-gray-300 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSelectedAssignment(parseInt(e.target.value, 10))}
            value={selectedAssignment || ''}
          >
            <option value="">Select Assignment</option>
            {assignments.map(assignment => (
              <option key={assignment.id} value={assignment.id}>
                {assignment.Operator?.firstname} {assignment.Operator?.lastname} - {assignment.Van?.plate_number}
              </option>
            ))}
          </select>
        </div>

        <div className="w-52 ml-auto">
          <label className="block text-gray-700 mb-2">Select Driver</label>
          <select
            className="cursor-pointer block w-full bg-white border border-gray-300 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSelectedDriver(parseInt(e.target.value, 10))}
            value={selectedDriver || ''}
          >
            <option value="">Select Driver</option>
            {availableDrivers.map(driver => (
              <option key={driver.id} value={driver.id}>{driver.firstname} {driver.lastname}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
            {editingAssignment ? 'Update Assignment' : 'Assign Driver'}
          </button>
        </div>
      </div>
    </form>
    </div>
      
      {assignmentsWithDrivers.length > 0 && (
        <div className="inline-block max-w-full relative">
  <table className="rounded-lg mx-auto overflow-hidden mt-[-3rem] w-full" style={{ tableLayout: 'fixed', width: '78.5rem',marginLeft:'14rem' }}>
    <thead className="bg-blue-500 text-xs text-center">
      <tr className="text-white">
        <th className="px-6 py-2 text-left font-normal rounded-l-lg">Van Plate Number</th>
        <th className="px-6 py-2 text-left font-normal">Driver Name</th>
        <th className="px-6 py-2 text-left font-normal">Operator Name</th>
        <th className="px-56 py-2 text-left font-normal rounded-r-lg">Actions</th>
      </tr>
    </thead>
    <tbody className="text-xs text-left">
      {assignmentsWithDrivers.map(assignment => (
        <tr key={assignment.id} className="border-b">
          <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>
            {assignment.Van.plate_number}
          </td>
          <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>
            {assignment.Driver?.firstname} {assignment.Driver?.lastname}
          </td>
          <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>
            {assignment.Operator.firstname} {assignment.Operator.lastname}
          </td>
          <td className="px-4 py-2 uppercase">
            <div className="flex ml-44 justify-center gap-2">
                <button
                  onClick={() => handleEditAssignment(assignment.id)}
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
                    <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" />
                  </svg>
                  <div className="absolute bottom-full mb-2 hidden text-xs text-white bg-yellow-500 p-1 rounded-md tooltip">
                    Edit
                  </div>
                </button>

              <style jsx>{`.relative:hover .tooltip { display: block;} `}</style>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      )}
    </div>
  );
};

export default AssignDriversForm;