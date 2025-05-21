import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-10 sm:p-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-8">
              <ArrowLeft className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Post Not Found</h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto">
              The blog post you are looking for doesn't exist or has been removed.
            </p>
            
            <Link 
              href="/blog" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 mr-2" /> Back to all posts
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
