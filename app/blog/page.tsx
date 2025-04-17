import { getAllPosts } from '@/utils/blog'; // Assuming utils is aliased or provide correct path
import BlogPageClient from './BlogPageClient'; // Assuming BlogPageClient is in the same directory

export const metadata = {
  title: 'Blog | Riddhiman Rana',
  description: 'Thoughts, tutorials, and insights on web development and competitive programming',
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return <BlogPageClient posts={posts} />;
}
