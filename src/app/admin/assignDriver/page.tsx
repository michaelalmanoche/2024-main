"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssignDriversForm from './AssignDriversForm';
import { Driver } from '@prisma/client';

const AssignDriversPage = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      const { data } = await axios.get('/api/drivers');
      setDrivers(data);
    };

    fetchDrivers();
  }, []);

  return (
    <div>
      <AssignDriversForm drivers={drivers} />
    </div>
  );
};

export default AssignDriversPage;