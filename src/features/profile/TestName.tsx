'use client';
import React from 'react'
import { useAuth } from '@/context/AuthContext'
const TestName = () => {
    const {user} = useAuth();
  return (
    <div>
        <h1>{user?.name || "guest"}</h1>
    </div>
  )
}

export default TestName
