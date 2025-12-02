// frontend/src/features/profile/components/MyCircles.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, query, where, getDocs, doc, deleteDoc, getDoc, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../lib/firebase'; 
import { useAuth } from '../../../context/AuthContext'; 

interface Circle {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
  topic: string;
  lastActive: string;
  creatorId: string;
}

const MyCircles = () => {
  const { user: currentUser } = useAuth(); // Adjust this to match your auth hook's return value
  const [circles, setCircles] = useState<Circle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchCircles();
    }
  }, [currentUser]);

  const fetchCircles = async () => {
    if (!currentUser) return;

    try {
      // Get user's circle memberships
      const membershipsRef = collection(db, 'circleMemberships');
      const membershipsQuery = query(
        membershipsRef,
        where('userId', '==', currentUser.uid)
      );
      const membershipsSnapshot = await getDocs(membershipsQuery);
      
      const circleIds = membershipsSnapshot.docs.map(doc => doc.data().circleId);

      if (circleIds.length === 0) {
        setCircles([]);
        setLoading(false);
        return;
      }

      // Fetch circle details for each membership
      const circlePromises = circleIds.map(async (circleId) => {
        const circleRef = doc(db, 'circles', circleId);
        const circleDoc = await getDoc(circleRef);
        
        if (!circleDoc.exists()) return null;

        const circleData = circleDoc.data();

        // Count members
        const membersQuery = query(
          collection(db, 'circleMemberships'),
          where('circleId', '==', circleId)
        );
        const membersSnapshot = await getDocs(membersQuery);
        const memberCount = membersSnapshot.size;

        // Get last session/activity
        const sessionsQuery = query(
          collection(db, 'circleSessions'),
          where('circleId', '==', circleId),
          orderBy('startedAt', 'desc'),
          limit(1)
        );
        const sessionsSnapshot = await getDocs(sessionsQuery);
        const lastSession = sessionsSnapshot.docs[0]?.data();
        const lastActive = lastSession?.startedAt?.toDate() || circleData.createdAt?.toDate();

        return {
          id: circleDoc.id,
          name: circleData.name,
          description: circleData.description,
          topic: circleData.topic || 'General',
          memberCount,
          isJoined: true,
          lastActive: formatRelativeTime(lastActive),
          creatorId: circleData.creatorId,
        };
      });

      const circlesData = await Promise.all(circlePromises);
      const validCircles = circlesData.filter(c => c !== null) as Circle[];
      
      // Sort by last active
      validCircles.sort((a, b) => {
        if (a.lastActive === 'Never') return 1;
        if (b.lastActive === 'Never') return -1;
        return 0;
      });

      setCircles(validCircles);
    } catch (error) {
      console.error('Error fetching circles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveCircle = async (circleId: string, creatorId: string) => {
    if (!currentUser) return;

    // Prevent creator from leaving
    if (creatorId === currentUser.uid) {
      alert('Circle creators cannot leave. Please transfer ownership or delete the circle.');
      return;
    }

    const confirmLeave = window.confirm('Are you sure you want to leave this circle?');
    if (!confirmLeave) return;

    try {
      // Find and delete the membership document
      const membershipsRef = collection(db, 'circleMemberships');
      const membershipQuery = query(
        membershipsRef,
        where('circleId', '==', circleId),
        where('userId', '==', currentUser.uid)
      );
      const membershipSnapshot = await getDocs(membershipQuery);

      if (!membershipSnapshot.empty) {
        const membershipDoc = membershipSnapshot.docs[0];
        await deleteDoc(doc(db, 'circleMemberships', membershipDoc.id));
        
        // Remove from local state
        setCircles(circles.filter(c => c.id !== circleId));
      }
    } catch (error) {
      console.error('Error leaving circle:', error);
      alert('Failed to leave circle. Please try again.');
    }
  };

  const formatRelativeTime = (date: Date | null): string => {
    if (!date) return 'Never';

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🔮</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">My Circles</h3>
        </div>
        <span className="text-sm text-gray-500">{circles.length} joined</span>
      </div>

      <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
        {circles.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🌱</div>
            <p className="text-gray-600 mb-2">You haven't joined any circles yet</p>
            <p className="text-sm text-gray-500">Start your healing journey by joining a community</p>
          </div>
        ) : (
<<<<<<< HEAD
          <div className="text-center py-8 mb-4">
            <p className="text-gray-400 text-sm mb-4">You haven&apost joined any circles yet</p>
          </div>
=======
          circles.map((circle) => (
            <div
              key={circle.id}
              className="bg-gradient-to-r from-[#E8F4F8] to-[#F5E6F1] rounded-2xl p-5 border border-[#4A90A4]/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-lg mb-1">{circle.name}</h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{circle.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <span className="mr-1">👥</span>
                      {circle.memberCount} members
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">🏷️</span>
                      {circle.topic}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">⏰</span>
                      {circle.lastActive}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/circles/${circle.id}`}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-center"
                >
                  View Circle
                </Link>
                <button
                  onClick={() => handleLeaveCircle(circle.id, circle.creatorId)}
                  className="px-4 py-2 bg-white/80 text-gray-600 text-sm font-semibold rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-300 border border-gray-200"
                >
                  Leave
                </button>
              </div>
            </div>
          ))
>>>>>>> origin/profile-page-new
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/circles/browse"
          className="px-6 py-3 bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-center"
        >
          Browse Circles
        </Link>
        <Link
          href="/circles/create"
          className="px-6 py-3 bg-white/80 backdrop-blur-md text-gray-700 font-semibold rounded-xl hover:bg-white transition-all duration-300 border border-[#4A90A4]/30 text-center"
        >
          Create Circle
        </Link>
      </div>
    </div>
  );
};

export default MyCircles;