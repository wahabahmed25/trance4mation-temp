'use client';
import React from 'react';
import TestName from '@/features/profile/TestName';
import { useAuth } from '@/context/AuthContext';

const Page = () => {
  const { user } = useAuth();

  return (
    <div>
      <TestName />
      <h1>{user?.name || 'guest'}</h1>
    </div>
  );
};

export default Page;
