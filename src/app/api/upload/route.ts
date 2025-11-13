/**
 * Image Upload API Route
 * Handles secure image uploads to Cloudinary with validation
 * Endpoint: POST /api/upload
 */

import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/services/cloudinary';

/**
 * POST /api/upload
 * Uploads an image file to Cloudinary after validation
 * Returns the uploaded image URL for storage
 */
export async function POST(request: NextRequest) {
  try {
    // Get image file from form data
    const formData = await request.formData();
    const file = formData.get('image') as File;

    // Validate file exists
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' }, 
        { status: 400 }
      );
    }

    // Validate file type - only JPEG allowed per requirements
    if (!file.type.startsWith('image/jpeg')) {
      return NextResponse.json(
        { error: 'Only JPEG images are allowed' },
        { status: 400 }
      );
    }

    // Validate file size - 3MB limit per requirements
    if (file.size > 3 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 3MB' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary and get secure URL
    const imageUrl = await uploadImage(file);

    // Return success with image URL for post creation
    return NextResponse.json({ imageUrl });
  } 
  catch (error) {
    // Log error for debugging
    console.error('Error uploading image:', error);
    
    // Return generic error to client
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}