'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Mock data for demonstration - this will be replaced with Firebase data later
const mockPosts = [
  {
    id: 1,
    author: "Anonymous Student",
    content: "Just finished my midterm! Feeling relieved and proud of the effort I put in. 📚✨",
    timestamp: "2 hours ago",
    supportCount: 12,
    relateCount: 8,
    type: "win"
  },
  {
    id: 2,
    author: "Anonymous Student",
    content: "Having a tough day but trying to stay positive. Remember that every small step counts! 💪",
    timestamp: "4 hours ago",
    supportCount: 25,
    relateCount: 18,
    type: "encouragement"
  },
  {
    id: 3,
    author: "Anonymous Student",
    content: "Today I managed to get out of bed early and make myself a healthy breakfast. Small wins matter! 🌅🥞",
    timestamp: "1 day ago",
    supportCount: 15,
    relateCount: 22,
    type: "checkin"
  }
]

// Predefined supportive phrases for comments
const supportivePhrases = [
  "You've got this! 💪",
  "Sending positive vibes your way! ✨",
  "I believe in you! 🌟",
  "You're stronger than you think! 🦋",
  "Keep going, you're doing great! 🌈",
  "You're not alone in this! 🤗",
  "Every step forward counts! 👏",
  "Proud of you for sharing! 💚"
]

interface Post {
  id: number
  author: string
  content: string
  timestamp: string
  supportCount: number
  relateCount: number
  type: string
}

const SocialFeed = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [newPost, setNewPost] = useState('')
  const [selectedPrompt, setSelectedPrompt] = useState('')
  const [showMyPosts, setShowMyPosts] = useState(false)

  const prompts = [
    "How are you feeling today?",
    "Share a small win from this week",
    "What's one thing you're grateful for?",
    "Send some encouragement to fellow students",
    "What's helping you get through tough times?"
  ]

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: posts.length + 1,
        author: "Anonymous Student", // In real app, this would be the current user
        content: newPost,
        timestamp: "Just now",
        supportCount: 0,
        relateCount: 0,
        type: "general"
      }
      setPosts([post, ...posts])
      setNewPost('')
      setSelectedPrompt('')
    }
  }

  const handleSendSupport = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, supportCount: post.supportCount + 1 }
        : post
    ))
  }

  const handleIRelate = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, relateCount: post.relateCount + 1 }
        : post
    ))
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'win': return 'border-l-4 border-l-green-400'
      case 'encouragement': return 'border-l-4 border-l-purple-400'
      case 'checkin': return 'border-l-4 border-l-blue-400'
      default: return 'border-l-4 border-l-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Social Feed</h1>
            <p className="text-gray-600">Share positivity and support with your community</p>
          </div>
          <Link
            href="/home"
            className="px-6 py-3 rounded-xl bg-white text-gray-700 font-semibold hover:bg-gray-100 transition shadow-md"
          >
            ← Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post Creation Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Share with the community</h2>
              
              {/* Prompt Selection */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-3">Choose a prompt or write freely:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {prompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedPrompt(prompt)
                        setNewPost(prompt + ' ')
                      }}
                      className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Post Input */}
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What would you like to share today?"
                className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-purple-400 focus:outline-none transition"
                rows={4}
              />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {280 - newPost.length} characters remaining
                </span>
                <button
                  onClick={handlePostSubmit}
                  disabled={!newPost.trim()}
                  className="px-6 py-2 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  Share
                </button>
              </div>
            </div>

            {/* Feed Filter */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowMyPosts(false)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  !showMyPosts 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setShowMyPosts(true)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  showMyPosts 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                My Posts
              </button>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className={`bg-white rounded-2xl p-6 shadow-lg ${getPostTypeColor(post.type)}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{post.author}</p>
                        <p className="text-sm text-gray-500">{post.timestamp}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                  
                  {/* Support Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleSendSupport(post.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition"
                    >
                      <span>💖</span>
                      <span className="font-medium">Send Support ({post.supportCount})</span>
                    </button>
                    <button
                      onClick={() => handleIRelate(post.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition"
                    >
                      <span>✨</span>
                      <span className="font-medium">I Relate ({post.relateCount})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Guidelines */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Community Guidelines</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Share authentic experiences and feelings</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Celebrate small wins and progress</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Offer support and encouragement</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Respect others' journeys and experiences</span>
                </div>
              </div>
            </div>

            {/* Supportive Phrases */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Support</h3>
              <p className="text-sm text-gray-600 mb-4">Click to copy supportive messages:</p>
              <div className="space-y-2">
                {supportivePhrases.slice(0, 4).map((phrase, index) => (
                  <button
                    key={index}
                    onClick={() => navigator.clipboard.writeText(phrase)}
                    className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-purple-50 rounded-lg transition"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Stats (Placeholder) */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Your Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Posts shared</span>
                  <span className="font-semibold text-purple-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Support sent</span>
                  <span className="font-semibold text-pink-600">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Connections made</span>
                  <span className="font-semibold text-blue-600">23</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialFeed