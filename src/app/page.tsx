'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types/post';
import PostForm from '@/components/PostForm';
import PostsList from '@/components/PostsList';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const postsData = await response.json();
        setPosts(postsData);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (postData: any) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('caption', postData.caption);
      formData.append('scheduledAt', postData.scheduledAt);
      if (postData.imageUrl) {
        formData.append('imageUrl', postData.imageUrl);
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create post');
      }

      await fetchPosts(); // Refresh the posts list
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Social Media Scheduler
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Schedule your social media posts with images and manage them all in one place.
            Perfect for planning your content strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Create New Post
              </h2>
              <PostForm onSubmit={handleCreatePost} isLoading={isSubmitting} />
            </div>
          </div>

          {/* Posts List Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Scheduled Posts
            </h2>
            <PostsList posts={posts} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}