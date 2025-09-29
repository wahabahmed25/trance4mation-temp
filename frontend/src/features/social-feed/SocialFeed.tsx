// frontend/src/features/social-feed/SocialFeed.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import BackgroundElements from '../../components/ui/BackgroundElements'
import PostCreationForm from './components/PostCreationForm'
import PostCard from './components/PostCard'
import Sidebar from './components/Sidebar'
import GradientButton from '../../components/ui/GradientButton'
import { usePosts } from './hooks/usePosts'
import { PostCreationData, SupportAction } from './types'

const SocialFeed = () => {
  const { posts, loading, error, addPost, handleSupportAction } = usePosts()
  const [showMyPosts, setShowMyPosts] = useState(false)
  const [postLoading, setPostLoading] = useState(false)

  const handlePostSubmit = async (postData: PostCreationData) => {
    try {
      setPostLoading(true)
      await addPost(postData)
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setPostLoading(false)
    }
  }

  const handleSupportClick = async (postId: string, action: SupportAction) => {
    await handleSupportAction(postId, action)
  }

  // Filter posts if showing "My Posts" (would need user auth to implement properly)
  const filteredPosts = showMyPosts 
    ? posts.filter(post => post.userId === 'current-user-id') // Replace with actual user ID
    : posts

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-red-200">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">
              Make sure Firebase is properly configured and try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      <BackgroundElements />

      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">✨</span>
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Social Feed
                  </h1>
                  <p className="text-gray-600 text-lg">Share positivity and support with your community</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>247 students online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></div>
                  <span>{posts.length} posts shared today</span>
                </div>
              </div>
            </div>
            <Link
              href="/home"
              className="group relative px-8 py-4 bg-white/80 backdrop-blur-md text-gray-700 font-semibold rounded-2xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/50"
            >
              <span className="relative z-10">← Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Feed */}
            <div className="xl:col-span-3 space-y-8">
              {/* Post Creation Section */}
              <PostCreationForm onSubmit={handlePostSubmit} loading={postLoading} />

              {/* Feed Filter */}
              <div className="flex space-x-4">
                <GradientButton
                  onClick={() => setShowMyPosts(false)}
                  variant={!showMyPosts ? 'primary' : 'secondary'}
                  size="md"
                >
                  All Posts
                </GradientButton>
                <GradientButton
                  onClick={() => setShowMyPosts(true)}
                  variant={showMyPosts ? 'primary' : 'secondary'}
                  size="md"
                >
                  My Posts
                </GradientButton>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                    <div className="text-gray-600 font-medium">Loading posts...</div>
                  </div>
                </div>
              )}

              {/* Posts Feed */}
              <div className="space-y-6">
                {filteredPosts.length === 0 && !loading ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🌟</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {showMyPosts ? "You haven't posted yet" : "No posts yet"}
                    </h3>
                    <p className="text-gray-600">
                      {showMyPosts 
                        ? "Share your first post to get started!" 
                        : "Be the first to share something positive!"
                      }
                    </p>
                  </div>
                ) : (
                  filteredPosts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onSupportAction={handleSupportClick}
                      index={index}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialFeed