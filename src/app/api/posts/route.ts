import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { scheduledAt: 'desc' },
    });

    // Update post status based on current time
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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const caption = formData.get('caption') as string;
    const scheduledAt = formData.get('scheduledAt') as string;
    const imageUrl = formData.get('imageUrl') as string;

    if (!caption || !scheduledAt) {
      return NextResponse.json(
        { error: 'Caption and scheduled date are required' },
        { status: 400 }
      );
    }

    const scheduledDate = new Date(scheduledAt);
    if (scheduledDate <= new Date()) {
      return NextResponse.json(
        { error: 'Scheduled date must be in the future' },
        { status: 400 }
      );
    }

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