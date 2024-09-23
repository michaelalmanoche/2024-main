'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UserDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const checkRole = async () => {
      try {
        const response = await axios.get('/api/check-role', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.role_id === 1) {
          router.push('/admin');
        }
      } catch {
        router.push('/login');
      }
    };

    checkRole();
  }, [router]);

  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  );
};

export default UserDashboard;
