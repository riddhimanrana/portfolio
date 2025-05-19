import { getPostBySlug, getAllSlugs } from '@/utils/blog'
import { MarkdownContent } from '@/components/markdown-content'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(await params.slug); // Add await here
  
  if (!post) {
    return {
      title: 'Post Not Found | Riddhiman Rana',
      description: 'The blog post you are looking for does not exist.',
    }
  }
  
  return {
    title: `${post.title} | Riddhiman Rana`,
    description: post.excerpt,
    keywords: post.tags,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs(); // Add await here

  // Ensure slugs is an array before mapping
  if (!Array.isArray(slugs)) {
    console.error("generateStaticParams: getAllSlugs did not return an array", slugs);
    return []; // Return empty array or handle error appropriately
  }

  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = await params.slug; // Add await here
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }
  
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to all posts
          </Link>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Calendar className="h-4 w-4 mr-1" /> {formattedDate}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full inline-flex items-center"
              >
                <Tag className="h-3 w-3 mr-1" /> {tag}
              </span>
            ))}
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
            <MarkdownContent content={post.content} />
          </div>
        </div>
      </main>
    </div>
  )
}
