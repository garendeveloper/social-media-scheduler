import { Post } from '@/types/post';
import PostCard from './PostCard';

interface PostsListProps {
  posts: Post[];
  isLoading?: boolean;
}

/**
 * PostsList Component
 * Displays a list of posts categorized into Upcoming and Past sections
 * Handles loading states and empty states gracefully
 */
export default function PostsList({ posts, isLoading = false }: PostsListProps) {
  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="flex justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  // Show empty state when no posts exist
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <div className="text-gray-500">No posts scheduled yet.</div>
        <div className="text-sm text-gray-400 mt-2">
          Create your first scheduled post above!
        </div>
      </div>
    );
  }

  // Categorize posts by status for organized display
  const upcomingPosts = posts.filter(post => post.status === 'UPCOMING');
  const pastPosts = posts.filter(post => post.status === 'PAST');

  return (
    <div className="space-y-8">
      {/* Upcoming Posts Section */}
      {upcomingPosts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upcoming Posts ({upcomingPosts.length})
          </h2>
          <div className="space-y-4">
            {upcomingPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Past Posts Section */}
      {pastPosts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Past Posts ({pastPosts.length})
          </h2>
          <div className="space-y-4">
            {pastPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}