"use client";
import { useState } from 'react';
import OperatorForm from '../operators/OperatorForm';
import DriverForm from '../driver/DriverForm';


const OperatorsPage = () => { 
  const [form, setForm] = useState("operator");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <div className=''>
      
      <div className="flex items-center ml-52">
        <span className="mr-2">Operator</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input  type="checkbox"  className="sr-only peer"  checked={form === "driver"}   onChange={() => setForm(form === "operator" ? "driver" : "operator")}  />
          <div className="w-11 h-6 bg-gray-300 rounded-full  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 "></div>
        </label>
        <span className="ml-2">Driver</span>
      </div>
      
      <h1>Register</h1>
      
      {form === "operator" ? <OperatorForm /> : <DriverForm />}
  
    </div>
  );
}

export default OperatorsPage;