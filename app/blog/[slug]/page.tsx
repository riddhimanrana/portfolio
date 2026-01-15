import { getPostBySlug, getAllSlugs } from '@/utils/blog'
import { MarkdownContent } from '@/components/markdown-content'
import { Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { formatDate } from '@/lib/utils'
import { TableOfContents } from '@/components/toc'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const param = await params; // Ensure params is awaited
  const post = await getPostBySlug(param.slug); // Add await here
  
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
  
  const formattedDate = formatDate(post.date)
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-clip">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Navigation - full width */}
        <div className="max-w-5xl mx-auto mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5 transition-transform duration-200 group-hover:-translate-x-1" /> 
            Back to all posts
          </Link>
        </div>
        
        {/* Main layout with TOC sidebar */}
        <div className="max-w-5xl mx-auto lg:grid lg:grid-cols-[1fr_180px] lg:gap-8 xl:gap-12">
          {/* Article content */}
          <div className="min-w-0">
            {/* Post header */}
            <header className="mb-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-tight tracking-tight">{post.title}</h1>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-1.5" /> 
                <span>{formattedDate}</span>
              </div>
            </header>
            
            {/* Main article content */}
            <article>
              <div className="bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-800/50 p-6 sm:p-10">
                <MarkdownContent content={post.content} />
              </div>
              
              {/* Post footer with navigation */}
              <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800/30">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 font-medium text-sm group"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" /> 
                    Back to all posts
                  </Link>
                  
                  <div className="text-sm text-gray-400 dark:text-gray-500">
                    Published on {formattedDate}
                  </div>
                </div>
              </div>
            </article>
          </div>
          
          {/* Table of Contents sidebar - desktop only */}
          <aside className="hidden lg:block min-w-0 lg:self-stretch">
            <div className="sticky top-24">
              <TableOfContents content={post.content} />
            </div>
          </aside>
        </div>
      </main>
      
      {/* Mobile TOC - rendered outside main content flow */}
      <div className="lg:hidden">
        <TableOfContents content={post.content} />
      </div>
    </div>
  )

}
