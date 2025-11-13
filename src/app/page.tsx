'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types/post';
import PostForm from '@/components/PostForm';
import PostsList from '@/components/PostsList';

/**
 * Home Component - Main page for the Social Media Scheduler
 * Handles post creation, data fetching, and state management
 * Implements a two-column layout with form and posts list
 */
export default function Home() {
  // State for storing the list of posts
  const [posts, setPosts] = useState<Post[]>([]);
  // Loading state for initial data fetch
  const [isLoading, setIsLoading] = useState(true);
  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Fetches all posts from the API and updates state
   * Handles both success and error cases gracefully
   */
  const fetchPosts = async () => {
    try {
      // Make API request to get all posts
      const response = await fetch('/api/posts');
      
      // Check if response is successful (status 200-299)
      if (response.ok) {
        const postsData = await response.json();
        setPosts(postsData);
      }
    } catch (error) {
      // Log error for debugging while maintaining user experience
      console.error('Error fetching posts:', error);
    } finally {
      // Always disable loading state regardless of success/error
      setIsLoading(false);
    }
  };

  /**
   * useEffect hook to fetch posts when component mounts
   * Empty dependency array ensures this runs only once on component mount
   */
  useEffect(() => {
    fetchPosts();
  }, []); // Empty dependency array = run only on mount

  /**
   * Handles post creation by submitting form data to the API
   * Manages loading states and error handling
   * @param postData - Object containing caption, scheduledAt, and optional imageUrl
   */
  const handleCreatePost = async (postData: any) => {
    try {
      // Set submitting state to true to show loading indicator
      setIsSubmitting(true);
      
      // Create FormData object for multipart form submission
      const formData = new FormData();
      formData.append('caption', postData.caption);
      formData.append('scheduledAt', postData.scheduledAt);
      
      // Only append imageUrl if it exists (optional field)
      if (postData.imageUrl) {
        formData.append('imageUrl', postData.imageUrl);
      }

      // Make POST request to create new post
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData, // FormData automatically sets Content-Type to multipart/form-data
      });

      // Handle API errors - throw error if response is not OK
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create post');
      }

      // Refresh the posts list to include the newly created post
      await fetchPosts();
      
    } catch (error) {
      // Show user-friendly error message
      alert(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      // Always reset submitting state regardless of success/error
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 py-8">
      {/* Main container with max-width and responsive padding */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section with title and description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Social Media Scheduler
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Schedule your social media posts with images and manage them all in one place.
            Perfect for planning your content strategy.
          </p>
        </div>

        {/* Two-column layout for form and posts list */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Post Creation Form */}
          <div className="lg:col-span-1">
            {/* Sticky container to keep form visible while scrolling */}
            <div className="sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Create New Post
              </h2>
              {/* PostForm component with onSubmit handler and loading state */}
              <PostForm onSubmit={handleCreatePost} isLoading={isSubmitting} />
            </div>
          </div>

          {/* Right Column - Posts Display */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Scheduled Posts
            </h2>
            {/* PostsList component with posts data and loading state */}
            <PostsList posts={posts} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}