/**
 * Posts API Route - /api/posts
 * Handles post retrieval and creation with validation
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET - Fetch all posts with dynamic status calculation
 */
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { scheduledAt: 'desc' },
    });

    // Calculate current status based on scheduled time
    const updatedPosts = posts.map(post => ({
      ...post,
      status: new Date(post.scheduledAt) < new Date() ? 'PAST' : 'UPCOMING',
    }));

    return NextResponse.json(updatedPosts);
  } 
  catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

/**
 * POST - Create new post with validation
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const caption = formData.get('caption') as string;
    const scheduledAt = formData.get('scheduledAt') as string;
    const imageUrl = formData.get('imageUrl') as string;

    // Validate required fields
    if (!caption || !scheduledAt) {
      return NextResponse.json(
        { error: 'Caption and scheduled date are required' },
        { status: 400 }
      );
    }

    // Validate future date
    const scheduledDate = new Date(scheduledAt);
    if (scheduledDate <= new Date()) {
      return NextResponse.json(
        { error: 'Scheduled date must be in the future' },
        { status: 400 }
      );
    }

    // Create post in database
    const post = await prisma.post.create({
      data: {
        caption,
        imageUrl: imageUrl || null,
        scheduledAt: scheduledDate,
        status: 'UPCOMING',
      },
    });

    return NextResponse.json(post);
  } 
  catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}