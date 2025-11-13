import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

/**
 * PostCard Component
 * Displays an individual social media post with status, scheduling info, and image
 */
export default function PostCard({ post }: PostCardProps) {
  // Determine if post is in the past for conditional rendering
  const isPast = post.status === 'PAST';
  const scheduledDate = new Date(post.scheduledAt);
  const now = new Date();

  /**
   * Returns Tailwind classes for status badge colors
   * Green for PAST posts, blue for UPCOMING posts
   */
  const getStatusColor = (status: string) => {
    return status === 'PAST' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-blue-100 text-blue-800';
  };

  /**
   * Calculates human-readable time until scheduled post
   * Returns formatted string like "in 2 days" or "in 3 hours"
   */
  const getTimeDifference = () => {
    const diff = scheduledDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `in ${hours} hour${hours > 1 ? 's' : ''}`;
    return 'now';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      {/* Header with status badge and scheduling info */}
      <div className="flex justify-between items-start mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
          {post.status}
        </span>
        <div className="text-right">
          <div className="text-sm text-gray-500">
            {scheduledDate.toLocaleDateString()} at {scheduledDate.toLocaleTimeString()}
          </div>
          {/* Show time until posting for upcoming posts */}
          {!isPast && (
            <div className="text-xs text-gray-400 mt-1">
              Scheduled {getTimeDifference()}
            </div>
          )}
        </div>
      </div>

      {/* Post caption/content */}
      <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.caption}</p>

      {/* Optional image display */}
      {post.imageUrl && (
        <div className="mt-4">
          <img
            src={post.imageUrl}
            alt="Post attachment"
            className="rounded-lg max-w-full h-auto max-h-64 object-cover"
          />
        </div>
      )}

      {/* Footer with creation timestamp */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Created: {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}