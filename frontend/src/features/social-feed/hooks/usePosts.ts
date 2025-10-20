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
  serverTimestamp,
  arrayUnion,
  arrayRemove
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
          supportedBy: data.supportedBy || [],
          relatedBy: data.relatedBy || [],
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

  // Add new post to Firebase (requires authentication)
  const addPost = async (postData: PostCreationData) => {
    if (!auth.currentUser) {
      setError('You must be logged in to create a post');
      throw new Error('User not authenticated');
    }

    try {
      const newPost = {
        content: postData.content,
        prompt: postData.prompt || undefined,
        type: postData.type,
        author: auth.currentUser.displayName || 'Anonymous Student',
        timestamp: 'Just now',
        supportCount: 0,
        relateCount: 0,
        supportedBy: [],
        relatedBy: [],
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid
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
    if (!auth.currentUser) {
      setError('You must be logged in to edit a post');
      throw new Error('User not authenticated');
    }

    // Check if user owns this post
    const post = posts.find(p => p.id === postId);
    if (post && post.userId !== auth.currentUser.uid) {
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
    if (!auth.currentUser) {
      setError('You must be logged in to delete a post');
      throw new Error('User not authenticated');
    }

    // Check if user owns this post
    const post = posts.find(p => p.id === postId);
    if (post && post.userId !== auth.currentUser.uid) {
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

  // Handle support actions (Send Support, I Relate) - one click per user
  const handleSupportAction = async (postId: string, action: SupportAction) => {
    if (!auth.currentUser) {
      setError('You must be logged in to react');
      return;
    }

    try {
      const postRef = doc(db, 'posts', postId);
      const currentPost = posts.find(p => p.id === postId);
      
      if (!currentPost) return;

      const userId = auth.currentUser.uid;
      const fieldToUpdate = action === 'support' ? 'supportCount' : 'relateCount';
      const arrayField = action === 'support' ? 'supportedBy' : 'relatedBy';
      const userArray = action === 'support' ? currentPost.supportedBy : currentPost.relatedBy;

      // Check if user already reacted
      const hasReacted = userArray?.includes(userId);

      if (hasReacted) {
        // User already clicked - remove their reaction (toggle off)
        await updateDoc(postRef, {
          [fieldToUpdate]: currentPost[fieldToUpdate] - 1,
          [arrayField]: arrayRemove(userId)
        });

        // Update local state
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                [fieldToUpdate]: post[fieldToUpdate] - 1,
                [arrayField]: post[arrayField]?.filter(id => id !== userId) || []
              }
            : post
        ));
      } else {
        // User hasn't clicked - add their reaction
        await updateDoc(postRef, {
          [fieldToUpdate]: currentPost[fieldToUpdate] + 1,
          [arrayField]: arrayUnion(userId)
        });

        // Update local state
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                [fieldToUpdate]: post[fieldToUpdate] + 1,
                [arrayField]: [...(post[arrayField] || []), userId]
              }
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