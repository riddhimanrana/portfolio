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
  const slug = await params
  const post = await getPostBySlug(slug.slug)

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
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mx-auto max-w-3xl lg:max-w-4xl">
          {/* Navigation and tags section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <Link href="/blog" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4 sm:mb-0">
              <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to all posts
            </Link>
            
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-0.5 rounded-full inline-flex items-center"
                >
                  <Tag className="h-2.5 w-2.5 mr-1" /> {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Post header */}
          <header className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">{post.title}</h1>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-1" /> {formattedDate}
            </div>
          </header>
          
          {/* Main article content */}
          <article>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-5 sm:p-8">
              <MarkdownContent content={post.content} />
            </div>
            
            {/* Post footer with navigation */}
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-4 sm:mb-0"
                >
                  <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to all posts
                </Link>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Published on {formattedDate}
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  )

}
