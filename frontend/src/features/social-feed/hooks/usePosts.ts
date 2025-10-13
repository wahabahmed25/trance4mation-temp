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
import { db, auth } from '../../../lib/firebase';
import { Post, PostCreationData, SupportAction } from '../types';
import { onAuthStateChanged } from 'firebase/auth';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserId(user?.uid || null);
    });
    return () => unsubscribe();
  }, []);

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

  // Add new post to Firebase (only if authenticated)
  const addPost = async (postData: PostCreationData) => {
    // TEMPORARY: Allow posting without auth for testing
    // Remove this check once authentication is fully working
    const userId = auth.currentUser?.uid || 'anonymous-user';
    const displayName = auth.currentUser?.displayName || 'Anonymous Student';

    try {
      const newPost = {
        content: postData.content,
        prompt: postData.prompt || null,
        type: postData.type,
        author: displayName,
        timestamp: 'Just now',
        supportCount: 0,
        relateCount: 0,
        createdAt: serverTimestamp(),
        userId: userId
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

  // Update/Edit post (only if user owns the post)
  const updatePost = async (postId: string, content: string) => {
    // TEMPORARY: Allow editing without strict auth check for testing
    const userId = auth.currentUser?.uid || 'anonymous-user';

    // Check if user owns this post
    const post = posts.find(p => p.id === postId);
    if (post && post.userId !== userId) {
      setError('You can only edit your own posts');
      throw new Error('Unauthorized');
    }

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

  // Delete post (only if user owns the post)
  const deletePost = async (postId: string) => {
    // TEMPORARY: Allow deleting without strict auth check for testing
    const userId = auth.currentUser?.uid || 'anonymous-user';

    // Check if user owns this post
    const post = posts.find(p => p.id === postId);
    if (post && post.userId !== userId) {
      setError('You can only delete your own posts');
      throw new Error('Unauthorized');
    }

    try {
      const postRef = doc(db, 'posts', postId);
      await deleteDoc(postRef);

      // Remove from local state
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post');
      throw err;
    }
  };

  // Handle support actions (Send Support, I Relate) - anyone can do this
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
    currentUserId,
    addPost,
    updatePost,
    deletePost,
    handleSupportAction,
    refetchPosts: fetchPosts
  };
};