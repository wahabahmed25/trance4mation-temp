// frontend/src/features/social-feed/hooks/usePosts.ts
'use client'

import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  doc, 
  orderBy, 
  query, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Post, PostCreationData, SupportAction } from '../types';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from Firebase
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(postsQuery);
      
      const fetchedPosts: Post[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          author: data.author || 'Anonymous Student',
          content: data.content,
          prompt: data.prompt || undefined,
          timestamp: data.timestamp || 'Just now',
          supportCount: data.supportCount || 0,
          relateCount: data.relateCount || 0,
          type: data.type || 'general',
          createdAt: data.createdAt?.toDate() || new Date(),
          userId: data.userId
        };
      });
      
      setPosts(fetchedPosts);
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  // Add new post to Firebase
  const addPost = async (postData: PostCreationData) => {
    try {
      const newPost = {
        content: postData.content,
        prompt: postData.prompt || null,
        type: postData.type,
        author: 'Anonymous Student', // In real app, get from auth
        timestamp: 'Just now',
        supportCount: 0,
        relateCount: 0,
        createdAt: serverTimestamp(),
        userId: 'temp-user-id' // In real app, get from auth
      };

      const docRef = await addDoc(collection(db, 'posts'), newPost);
      
      // Add to local state immediately for better UX
      const localPost: Post = {
        ...newPost,
        id: docRef.id,
        createdAt: new Date()
      };
      
      setPosts(prev => [localPost, ...prev]);
      return docRef.id;
    } catch (err) {
      console.error('Error adding post:', err);
      setError('Failed to create post');
      throw err;
    }
  };

  // Update/Edit post
  const updatePost = async (postId: string, content: string) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        content: content,
        timestamp: 'Edited'
      });

      // Update local state
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, content, timestamp: 'Edited' }
          : post
      ));
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post');
      throw err;
    }
  };

  // Delete post
  const deletePost = async (postId: string) => {
    try {
      const postRef = doc(db, 'posts', postId);
      // Actually delete the document from Firebase
      await deleteDoc(postRef);

      // Remove from local state
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post');
      throw err;
    }
  };

  // Handle support actions (Send Support, I Relate)
  const handleSupportAction = async (postId: string, action: SupportAction) => {
    try {
      const postRef = doc(db, 'posts', postId);
      const fieldToUpdate = action === 'support' ? 'supportCount' : 'relateCount';
      
      // Update in Firebase
      const currentPost = posts.find(p => p.id === postId);
      if (currentPost) {
        const newCount = currentPost[fieldToUpdate] + 1;
        await updateDoc(postRef, {
          [fieldToUpdate]: newCount
        });

        // Update local state
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, [fieldToUpdate]: newCount }
            : post
        ));
      }
    } catch (err) {
      console.error('Error updating support action:', err);
      setError('Failed to update support');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    addPost,
    updatePost,
    deletePost,
    handleSupportAction,
    refetchPosts: fetchPosts
  };
};