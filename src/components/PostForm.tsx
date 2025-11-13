'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**
 * Form validation schema using Zod
 * Ensures caption is required and under 500 chars
 * Validates scheduled date is in the future
 */
const postSchema = z.object({
  caption: z.string().min(1, 'Caption is required').max(500, 'Caption too long'),
  scheduledAt: z.string().min(1, 'Scheduled date is required'),
}).refine((data) => new Date(data.scheduledAt) > new Date(), {
  message: 'Scheduled date must be in the future',
  path: ['scheduledAt'],
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
  onSubmit: (data: PostFormData & { imageUrl?: string }) => void;
  isLoading?: boolean;
}

/**
 * PostForm Component
 * Handles post creation with image upload and scheduling
 * Includes validation, image preview, and loading states
 */
export default function PostForm({ onSubmit, isLoading = false }: PostFormProps) {
  // State for image preview and file handling
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  /**
   * Handles image file selection with validation
   * Validates file type (JPEG only) and size (3MB max)
   * Creates preview URL for user confirmation
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/jpeg')) {
        alert('Only JPEG images are allowed');
        return;
      }
      if (file.size > 3 * 1024 * 1024) {
        alert('File size must be less than 3MB');
        return;
      }
      
      setImageFile(file);
      // Create preview URL for user to see selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Uploads image to server and returns Cloudinary URL
   * Handles upload errors and provides user feedback
   */
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }

    const data = await response.json();
    return data.imageUrl;
  };

  /**
   * Handles form submission
   * Uploads image if present, then submits post data
   * Resets form and states on successful submission
   */
  const onSubmitForm = async (data: PostFormData) => {
    try {
      setUploading(true);
      let imageUrl = '';

      // Upload image first if one was selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Submit post data with optional image URL
      onSubmit({ ...data, imageUrl });
      
      // Reset form and clear states
      reset();
      setImagePreview('');
      setImageFile(null);
      
      // Clear file input
      const fileInput = document.getElementById('image') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  // Combined loading state for form submission
  const isSubmitting = isLoading || uploading;

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {/* Caption Input */}
      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
          Caption *
        </label>
        <textarea
          id="caption"
          {...register('caption')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 border p-2"
          placeholder="What's on your mind?"
        />
        {errors.caption && (
          <p className="mt-1 text-sm text-red-600">{errors.caption.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image (JPEG, max 3MB)
        </label>
        <input
          id="image"
          type="file"
          accept="image/jpeg"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-32 w-32 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Schedule Date Input */}
      <div>
        <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700">
          Scheduled Date & Time *
        </label>
        <input
          id="scheduledAt"
          type="datetime-local"
          {...register('scheduledAt')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 border p-2"
        />
        {errors.scheduledAt && (
          <p className="mt-1 text-sm text-red-600">{errors.scheduledAt.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creating Post...' : 'Schedule Post'}
      </button>
    </form>
  );
}