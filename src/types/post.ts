export interface Post {
  id: string;
  caption: string;
  imageUrl?: string;
  scheduledAt: Date;
  status: 'UPCOMING' | 'PAST';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostData {
  caption: string;
  imageFile?: File;
  scheduledAt: Date;
}