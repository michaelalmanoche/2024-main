"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Modal from "./Modal"; // Import the Modal component
import { Van } from "@/types";

const VanForm = () => {
  const [van, setVan] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [vanList, setVanList] = useState<Van[]>([]);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedVan, setSelectedVan] = useState<Van | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const totalPages = Math.ceil(vanList.length / rowsPerPage);

  // Dropdown options
  const initialFuelOptions = ["Diesel", "Gasoline", "Electric", "Hybrid"];
  const initialMakeOptions = ["Toyota", "Ford", "Honda", "Chevrolet"];
  const initialBodyTypeOptions = ["Van", "Truck", "Sedan", "SUV"];
  const initialDenominationOptions = ["1.5L", "2.0L", "2.5L", "3.0L"];
  const initialPistonDisplacementOptions = ["1000cc", "1500cc", "2000cc", "2500cc"];

  const [fuelOptions, setFuelOptions] = useState(initialFuelOptions);
  const [makeOptions, setMakeOptions] = useState(initialMakeOptions);
  const [bodyTypeOptions, setBodyTypeOptions] = useState(initialBodyTypeOptions);
  const [denominationOptions, setDenominationOptions] = useState(initialDenominationOptions);
  const [pistonDisplacementOptions, setPistonDisplacementOptions] = useState(initialPistonDisplacementOptions);

  const [customOption, setCustomOption] = useState("");
  const [isCustomOptionVisible, setIsCustomOptionVisible] = useState(false);

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const response = await axios.get("/api/vans");
        setVanList(response.data);
      } catch (error) {
        console.error("Failed to fetch vans:", error);
      }
    };

    fetchVans();
  }, []);

  useEffect(() => {
    // Check if the current page has rows
    if (!hasRows(currentPage, rowsPerPage, vanList) && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, rowsPerPage, vanList]);

  // Function to check if the current page has rows
  const hasRows = (currentPage: number, rowsPerPage: number, data: Van[]) => {
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

  const currentRows = vanList.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRegisterModalClose = () => {
    setIsRegisterModalOpen(false);
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setIsEditMode(false);
    setSelectedVan(null);
  };

  const handleView = (van: Van) => {
    setSelectedVan(van);
    setIsViewModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleArchive = async (van: Van) => {
    const confirmArchive = confirm(
      `Are you sure you want to archive van with Plate Number ${van.plate_number}?`
    );
    if (confirmArchive) {
      try {
        await axios.delete(`/api/vans`, { data: { id: van.id } });
        alert("Van archived successfully");
        setVanList((prev) => prev.filter((v) => v.id !== van.id));
      } catch (error) {
        console.error("Failed to archive van:", error);
        alert("Failed to archive van");
      }
    }
  };

  const handleRegisterChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const index = parseInt(name);
    setVan((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleCustomOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomOption(event.target.value);
  };

  const handleCustomOptionSave = (optionType: string) => {
    switch (optionType) {
      case "fuel":
        setFuelOptions((prevOptions) => [...prevOptions, customOption]);
        setVan((prevVan) => {
          const updatedVan = [...prevVan];
          updatedVan[7] = customOption;
          return updatedVan;
        });
        break;
      case "piston_displacement":
        setPistonDisplacementOptions((prevOptions) => [...prevOptions, customOption]);
        setVan((prevVan) => {
          const updatedVan = [...prevVan];
          updatedVan[5] = customOption;
          return updatedVan;
        });
        break;
      case "denomination":
        setDenominationOptions((prevOptions) => [...prevOptions, customOption]);
        setVan((prevVan) => {
          const updatedVan = [...prevVan];
          updatedVan[4] = customOption;
          return updatedVan;
        });
        break;
        case "make":
        setMakeOptions((prevOptions) => [...prevOptions, customOption]);
        setVan((prevVan) => {
          const updatedVan = [...prevVan];
          updatedVan[8] = customOption;
          return updatedVan;
        });
        break;
      // Add cases for other dropdowns as needed
      default:
        break;
    }
    setCustomOption("");
    setIsCustomOptionVisible(false);
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/vans", {
        mv_file_no: van[0],
        plate_number: van[1],
        engine_no: van[2],
        chassis_no: van[3],
        denomination: van[4],
        piston_displacement: van[5],
        number_of_cylinders: van[6],
        fuel: van[7],
        make: van[8],
        series: van[9],
        body_type: van[10],
        body_no: van[11],
        year_model: van[12],
        gross_weight: van[13],
        net_weight: van[14],
        shipping_weight: van[15],
        net_capacity: van[16],
        year_last_registered: van[17],
        expiration_date: van[18],
      });
      alert("Van registered successfully");
      setVan([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]);
      const response = await axios.get("/api/vans");
      setVanList(response.data);
      handleRegisterModalClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Failed to register van:", error);
      alert("Failed to register van");
    }
  };

  const handleViewChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (selectedVan) {
      const { name, value } = e.target;
      setSelectedVan((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleViewSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedVan) return;

    try {
      await axios.put(`/api/vans/${selectedVan.id}`, selectedVan);
      alert("Van updated successfully");
      const response = await axios.get("/api/vans");
      setVanList(response.data);
      handleViewModalClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Failed to update van:", error);
      alert("Failed to update van");
    }
  };




  

  return (
    <div>
      <button onClick={() => setIsRegisterModalOpen(true)} 
         className="bg-blue-500 text-white font-light text-sm px-2 
         py-2 rounded-md ml-auto flex items-center  sm:mb-6 
          hover:bg-blue-600 transition duration-300">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" className="mr-1">
           <path d="M12 8V16M16 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
           <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
         </svg>
        Register New Van
      </button>

      {/* Register Modal */}
<Modal isOpen={isRegisterModalOpen} onClose={handleRegisterModalClose} title="Register Modal">
<form onSubmit={handleRegisterSubmit} className="p-6 bg-white rounded-lg">
  <div className="grid sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    
    <div className="relative w-full max-w-xs ml-[-1.5rem] mt-[-1.5rem]">
      <label htmlFor="mv_file_no" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">MV File No.</label>
      <input  type="text"  name="0"  value={van[0]}  onChange={handleRegisterChange}  required  style={{ height: '3.8rem', width: '13.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-gray-900 border-black focus:outline-none text-right"  />
    </div>

    <div className="relative w-full max-w-xs mt-[-1.5rem]" style={{ marginLeft: '1.85rem', width: '14rem' }}>
      <label htmlFor="plate_number" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Plate Number</label>
      <input type="text"  name="1" value={van[1]}  onChange={handleRegisterChange}  required style={{ height: '3.8rem' }}  className="block w-full px-3 pt-6 pb-2 border text-gray-900 border-black focus:outline-none text-right" />
    </div>

    <div className="relative w-full max-w-xs mt-[-1.5rem]" style={{ marginLeft: '5.35rem', width: '14rem' }}>
      <label htmlFor="engine_no" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Engine No</label>
      <input type="text"  name="2" value={van[2]} onChange={handleRegisterChange}required  style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-gray-900 border-black focus:outline-none text-right" />
    </div>

    <div className="relative w-full max-w-xs  mt-[-1.5rem] " style={{ marginLeft: '8.91rem', width: '13.5rem' }}>
      <label htmlFor="chassis_no" className="absolute text-gray-500 top-1 left-3 text-sm uppercase ">Chassis No</label>
      <input type="text" name="3" value={van[3]} onChange={handleRegisterChange}  required  style={{ height: '3.8rem' }}  className="block w-full px-3  pt-6 pb-2 border text-gray-900 border-black focus:outline-none text-right" />
    </div>

    <br />

    <div className="relative w-full max-w-xs ml-[-1.5rem]" style={{ marginTop: '-0.1rem', width: '13.8rem' }}>
              <label htmlFor="denomination" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Denomination</label>
              <select name="4" value={van[4]} onChange={handleRegisterChange} required style={{ height: '3.8rem' }} className="block w-full text-sm text-center pt-6 pb-2 border text-gray-900 border-black focus:outline-none">
                <option value="">Select Denomination</option>
                {denominationOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
                <option value="other">Other</option>
              </select>
              {van[4] === "other" && (
                <div className="mt-2">
                  <input type="text" value={customOption} onChange={handleCustomOptionChange} placeholder="Enter new denomination" className="border px-2 py-1" />
                  <button type="button" onClick={() => handleCustomOptionSave("denomination")} className="ml-2 px-2 py-1 bg-blue-500 text-white">Save</button>
                </div>
              )}
            </div>


            <div className="relative w-full max-w-xs" style={{ marginTop: '-0.1rem', marginLeft: '1.85rem', width: '14rem' }}>
              <label htmlFor="piston_displacement" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Piston Displacement</label>
              <select name="5" value={van[5]} onChange={handleRegisterChange} required style={{ height: '3.8rem' }} className="block w-full text-sm pt-6 pb-2 border text-center text-gray-900 border-black focus:outline-none">
                <option value="">Select Piston Displacement</option>
                {pistonDisplacementOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
                <option value="other">Other</option>
              </select>
              {van[5] === "other" && (
                <div className="mt-2">
                  <input type="text" value={customOption} onChange={handleCustomOptionChange} placeholder="Enter new piston displacement" className="border px-2 py-1" />
                  <button type="button" onClick={() => handleCustomOptionSave("piston_displacement")} className="ml-2 px-2 py-1 bg-blue-500 text-white">Save</button>
                </div>
              )}
            </div>

    <div className="relative w-full max-w-xs" style={{ marginTop: '-0.1rem', marginLeft: '5.35rem', width: '14rem' }}>
      <label htmlFor="number_of_cylinders" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Number of Cylinders</label>
      <input type="text" name="6"  value={van[6]} onChange={handleRegisterChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-gray-900 border-black focus:outline-none text-right" />
    </div>

    <div className="relative w-full max-w-xs" style={{ marginTop: '-0.1rem', marginLeft: '8.9rem', width: '13.5rem' }}>
              <label htmlFor="fuel" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Fuel</label>
              <select name="7" value={van[7]} onChange={handleRegisterChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-gray-900 border-black focus:outline-none">
                <option value="">Select Fuel</option>
                {fuelOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
                <option value="other">Other</option>
              </select>
              {van[7] === "other" && (
                <div className="mt-2">
                  <input type="text" value={customOption} onChange={handleCustomOptionChange} placeholder="Enter new fuel type" className="border px-2 py-1" />
                  <button type="button" onClick={() => handleCustomOptionSave("fuel")} className="ml-2 px-2 py-1 bg-blue-500 text-white">Save</button>
                </div>
              )}
            </div>
    <br />

    <div className="relative w-full max-w-xs ml-[-1.5rem]" style={{ marginTop: '0.2rem', width: '13.8rem' }}>
      <label htmlFor="make" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Make</label>
      <select  name="8" value={van[8]} onChange={handleRegisterChange} required  style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-center">
        <option value="">Select Make</option> {makeOptions.map((option) => ( <option key={option} value={option}>{option}</option> ))}
        <option value="other">Other</option>
      </select>
      {van[8] === "other" && (
        <div className="mt-2">
          <input type="text" value={customOption} onChange={handleCustomOptionChange} placeholder="Enter new make" className="border px-2 py-1" />
          <button type="button" onClick={() => handleCustomOptionSave("make")} className="ml-2 px-2 py-1 bg-blue-500 text-white">Save</button>
        </div>
      )}
    </div>

    <div className="relative w-full max-w-xs" style={{ marginTop: '0.2rem', marginLeft: '1.85rem', width: '14rem' }}>
      <label htmlFor="series" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Series</label>
      <input  type="text"  name="9" value={van[9]}  onChange={handleRegisterChange}  required  style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" />
    </div>

    <div className="relative w-full max-w-xs" style={{ marginTop: '0.2rem', marginLeft: '5.35rem', width: '14rem' }}>
      <label htmlFor="body_type" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Body Type</label>
      <input  type="text"  name="10" value={van[10]}  onChange={handleRegisterChange}  required  style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" />
    </div>

    

    <div className="relative w-full max-w-xs" style={{ marginTop: '0.2rem', marginLeft: '8.9rem', width: '7.1rem' }}>
      <label htmlFor="body_no" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Body No.</label>
      <input  type="text" name="11" value={van[11]} onChange={handleRegisterChange} required  style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" />
    </div>

    <div className="relative w-full max-w-xs" style={{ marginTop: '0.2rem', marginLeft: '5.5rem', width: '6.45rem' }}>
      <label htmlFor="year_model" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Year Model</label>
      <input  type="text" name="12" value={van[12]}  onChange={handleRegisterChange}  required  style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" />
    </div>
    <br />


    <div className="relative w-full max-w-xs ml-[-11.9rem]" style={{ marginTop: '-0.1rem', width: '13.8rem' }}>
      <label htmlFor="gross_weight" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Gross Weight</label>
      <input type="text"name="13"  value={van[13]}  onChange={handleRegisterChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" />
    </div>

    <div className="relative w-full max-w-xs" style={{ marginTop: '-0.1rem', marginLeft: '-8.6rem', width: '14rem' }}>
      <label htmlFor="net_weight" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Net Weight</label>
      <input   type="text"  name="14" value={van[14]} onChange={handleRegisterChange} required  style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right"/>
    </div>

    <div className="relative w-full max-w-xs" style={{ marginTop: '-0.1rem', marginLeft: '-81px', width: '14rem' }}>
      <label htmlFor="shipping_weight" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Shipping Weight</label>
      <input  type="text"  name="15"  value={van[15]} onChange={handleRegisterChange} required style={{ height: '3.8rem' }}  className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" />
    </div>

    <div className="relative w-full max-w-xs" style={{ marginTop: '-0.1rem', marginLeft: '-24.5px', width: '13.5rem' }}>
      <label htmlFor="net_capacity" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Net Capacity</label>
      <input type="text"  name="16"  value={van[16]} onChange={handleRegisterChange}  required style={{ height: '3.8rem' }}  className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" />
    </div>

    <br />

    <div className="relative w-full ml-[-11.9rem]" style={{ marginTop: '-0.1rem', width: '27.72rem' }}>
      <label htmlFor="year_last_registered" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Year Last Registered</label>
      <input  type="text" name="17" value={van[17]} onChange={handleRegisterChange}   required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" />
    </div>

    <div className="relative w-full" style={{ marginTop: '-0.1rem', width: '27.45rem', marginLeft: '5.35rem' }}>
  <label htmlFor="expiration_date" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Expiration Date</label>
  <input type="date" name="18" value={van[18]} onChange={handleRegisterChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" />
</div>
  </div>
  <button type="submit"
    className="text-white inline-flex items-center bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-green-500
     font-medium rounded-lg text-sm px-5 py-2.5 mt-7 text-center"
    style={{ marginLeft: '42rem' }}
  >
    <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
    Add new van
  </button>
</form>
</Modal>
      
      <div className="p-4 sm:p-6 lg:p-8 " style={{marginLeft:'12.5rem',marginTop:'-6rem'}}>
          <h2 className="text-2xl font-normal text-gray-600 ">Manage Vans</h2>
          <p className="text-gray-500 dark:text-gray-400">View, register, and update van details</p>
        </div>


      <h2>Registered Vans</h2>
      <div className="flex justify-start min-w-full overflow-x-auto relative mt-[-0.5rem]">
      <table className="bg-white rounded-lg overflow-hidden" style={{ tableLayout: 'fixed', marginLeft: '220px' }}>
  <thead className="bg-blue-400 text-xs">
    <tr className="text-white">
      <th className="px-4 py-2 w-32 text-left font-normal rounded-l-lg">MV File No</th>
      <th className="px-4 py-2 w-32 text-left font-normal">Plate Number</th>
      <th className="px-4 py-2 w-32 text-left font-normal">Engine No</th>
      <th className="px-4 py-2 w-32 text-left font-normal">Chassis No</th>
      <th className="px-4 py-2 w-32 text-left font-normal">Denomination</th>
      <th className="px-4 py-2 w-40 text-left font-normal">Piston Displacement</th>
      <th className="px-4 py-2 w-40 text-left font-normal">Number of Cylinders</th>
      <th className="px-4 py-2 w-32 text-left font-normal">Fuel</th>
      <th className="px-4 py-2 w-32 text-left font-normal">Make</th>
      <th className="px-4 py-2 w-32 text-center font-normal rounded-r-lg">Actions</th>
    </tr>
  </thead>
  <tbody className="text-xs">
    {currentRows.length === 0 ? (
      <tr>
        <td colSpan={10} className="px-4 py-52 text-center text-lg font-medium text-gray-400">
          No Van Registered
        </td>
      </tr>
    ) : (
      currentRows.map((v, index) => (
        <tr key={index} className="border-b">
          <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>{v.mv_file_no}</td>
          <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>{v.plate_number}</td>
          <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>{v.engine_no}</td>
          <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>{v.chassis_no}</td>
          <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>{v.denomination}</td>
          <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>{v.piston_displacement}</td>
          <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>{v.number_of_cylinders}</td>
          <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>{v.fuel}</td>
          <td className="px-4 py-2 uppercase" style={{ wordBreak: 'break-word' }}>{v.make}</td>
          <td className="px-4 py-2 uppercase">
            <div className="flex gap-2">
              <button
                onClick={() => handleView(v)}
                className="relative border border-green-400 text-green-400 p-2 rounded-md flex items-center justify-center bg-transparent hover:bg-green-400 hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="stroke-current text-green-400 hover:text-white transition-colors duration-300"
                  fill="none"
                >
                  <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                <div className="absolute bottom-full mb-2 hidden text-xs text-white bg-green-400 p-1 rounded-md tooltip">
                  View/Edit
                </div>
              </button>
              <style jsx>{` .relative:hover .tooltip { display: block; } `}</style>

              <button
                onClick={() => handleArchive(v)}
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
              <style jsx>{`.relative:hover .tooltip { display: block; } `}</style>
            </div>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

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

     {/* View/Edit Modal */}
{isViewModalOpen && selectedVan && (
  <Modal isOpen={isViewModalOpen} onClose={handleViewModalClose} title={isEditMode ? "Edit Van" : "View Van"}>
    <form onSubmit={isEditMode ? handleViewSubmit : (e) => e.preventDefault()} className="p-6 bg-white rounded-lg">
      <div className="grid sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div className="relative w-full max-w-xs ml-[-1.5rem] mt-[-1.5rem]">
          <label htmlFor="mv_file_no" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">MV File No.</label>
          <input type="text" name="mv_file_no" value={selectedVan.mv_file_no} onChange={handleViewChange} required style={{ height: '3.8rem', width: '13.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-gray-900 border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
        <div className="relative w-full max-w-xs mt-[-1.5rem]" style={{ marginLeft: '1.85rem', width: '14rem' }}>
          <label htmlFor="plate_number" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Plate Number</label>
          <input type="text" name="plate_number" value={selectedVan.plate_number} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-gray-900 border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
        <div className="relative w-full max-w-xs mt-[-1.5rem]" style={{ marginLeft: '5.35rem', width: '14rem' }}>
          <label htmlFor="engine_no" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Engine No</label>
          <input type="text" name="engine_no" value={selectedVan.engine_no} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-gray-900 border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
        <div className="relative w-full max-w-xs mt-[-1.5rem]" style={{ marginLeft: '8.91rem', width: '13.5rem' }}>
          <label htmlFor="chassis_no" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Chassis No</label>
          <input type="text" name="chassis_no" value={selectedVan.chassis_no} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-gray-900 border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
        <br />
        <div className="relative w-full max-w-xs ml-[-1.5rem]" style={{ marginTop: '-0.1rem', width: '13.8rem' }}>
          <label htmlFor="denomination" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Denomination</label>
          <select name="denomination" value={selectedVan.denomination} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full text-sm text-center pt-6 pb-2 border text-gray-900 border-black focus:outline-none" disabled={!isEditMode}>
            <option value="">Select Denomination</option>
            {denominationOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="relative w-full max-w-xs" style={{ marginTop: '-0.1rem', marginLeft: '1.85rem', width: '14rem' }}>
          <label htmlFor="piston_displacement" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Piston Displacement</label>
          <select name="piston_displacement" value={selectedVan.piston_displacement} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full text-sm pt-6 pb-2 border text-center text-gray-900 border-black focus:outline-none" disabled={!isEditMode}>
            <option value="">Select Piston Displacement</option>
            {pistonDisplacementOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="relative w-full max-w-xs" style={{ marginTop: '-0.1rem', marginLeft: '5.35rem', width: '14rem' }}>
          <label htmlFor="number_of_cylinders" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Number of Cylinders</label>
          <input type="text" name="number_of_cylinders" value={selectedVan.number_of_cylinders} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-gray-900 border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
        <div className="relative w-full max-w-xs" style={{ marginTop: '-0.1rem', marginLeft: '8.9rem', width: '13.5rem' }}>
          <label htmlFor="fuel" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Fuel</label>
          <select name="fuel" value={selectedVan.fuel} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-gray-900 border-black focus:outline-none" disabled={!isEditMode}>
            <option value="">Select Fuel</option>
            {fuelOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <br />
        <div className="relative w-full max-w-xs ml-[-1.5rem]" style={{ marginTop: '0.2rem', width: '13.8rem' }}>
          <label htmlFor="make" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Make</label>
          <select name="make" value={selectedVan.make} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-center" disabled={!isEditMode}>
            <option value="">Select Make</option>
            {makeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="relative w-full max-w-xs" style={{ marginTop: '0.2rem', marginLeft: '1.85rem', width: '14rem' }}>
          <label htmlFor="series" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Series</label>
          <input type="text" name="series" value={selectedVan.series} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
        <div className="relative w-full max-w-xs" style={{ marginTop: '0.2rem', marginLeft: '5.35rem', width: '14rem' }}>
          <label htmlFor="body_type" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Body Type</label>
          <select name="body_type" value={selectedVan.body_type} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" disabled={!isEditMode}>
            <option value="">Select Body Type</option>
            {bodyTypeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="relative w-full max-w-xs" style={{ marginTop: '0.2rem', marginLeft: '8.9rem', width: '7.1rem' }}>
          <label htmlFor="body_no" className="absolute text-gray-500 top-1 left-3 text-sm uppercase">Body No.</label>
          <input type="text" name="body_no" value={selectedVan.body_no} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
        <div className="relative w-full max-w-xs" style={{ marginTop: '0.2rem', marginLeft: '5.5rem', width: '6.45rem' }}>
          <label htmlFor="year_model" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Year Model</label>
          <input type="text" name="year_model" value={selectedVan.year_model} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
        <br />
        <div className="relative w-full max-w-xs ml-[-11.9rem]" style={{ marginTop: '-0.1rem', width: '13.8rem' }}>
          <label htmlFor="gross_weight" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Gross Weight</label>
          <input type="text" name="gross_weight" value={selectedVan.gross_weight} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
        <div className="relative w-full max-w-xs" style={{ marginTop: '-0.1rem', marginLeft: '-8.6rem', width: '14rem' }}>
          <label htmlFor="net_weight" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Net Weight</label>
          <input type="text" name="net_weight" value={selectedVan.net_weight} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
        <div className="relative w-full max-w-xs" style={{ marginTop: '-0.1rem', marginLeft: '-81px', width: '14rem' }}>
          <label htmlFor="shipping_weight" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Shipping Weight</label>
          <input type="text" name="shipping_weight" value={selectedVan.shipping_weight} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
        <div className="relative w-full max-w-xs" style={{ marginTop: '-0.1rem', marginLeft: '-24.5px', width: '13.5rem' }}>
          <label htmlFor="net_capacity" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Net Capacity</label>
          <input type="text" name="net_capacity" value={selectedVan.net_capacity} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
        <br />
        <div className="relative w-full ml-[-11.9rem]" style={{ marginTop: '-0.1rem', width: '27.72rem' }}>
          <label htmlFor="year_last_registered" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Year Last Registered</label>
          <input type="text" name="year_last_registered" value={selectedVan.year_last_registered} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
        <div className="relative w-full" style={{ marginTop: '-0.1rem', width: '27.45rem', marginLeft: '5.35rem' }}>
          <label htmlFor="expiration_date" className="absolute text-gray-500 top-1 left-2 text-sm uppercase">Expiration Date</label>
          <input type="text" name="expiration_date" value={selectedVan.expiration_date} onChange={handleViewChange} required style={{ height: '3.8rem' }} className="block w-full px-3 pt-6 pb-2 border text-black border-black focus:outline-none text-right" disabled={!isEditMode} />
        </div>
      </div>
      {!isEditMode && (
        <button onClick={handleEdit} className="text-white inline-flex items-center bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 mt-7 text-center" style={{ marginLeft: '42rem' }}>
         <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Edit
        </button>
      )}
      {isEditMode && (
        <button type="submit" className="text-white inline-flex items-center bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 mt-7 text-center" style={{ marginLeft: '42rem' }}>
          <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Update Van
        </button>
      )}
    </form>
  </Modal>
)}
    </div>
  );
};

export default VanForm;
