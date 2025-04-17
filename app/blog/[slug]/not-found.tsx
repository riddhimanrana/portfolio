import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            The blog post you are looking for doesn't exist or has been removed.
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to all posts
          </Link>
        </div>
      </main>
    </div>
  )
}
