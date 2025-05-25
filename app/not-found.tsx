import Link from 'next/link'
import { ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-10 sm:p-16">
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="text-8xl sm:text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                404
              </h1>
            </div>
            
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-8">
              <Search className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Page Not Found</h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/" 
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                <Home className="h-5 w-5 mr-2" /> 
                Go Home
              </Link>
              
              <Link 
                href="/projects" 
                className="inline-flex items-center px-8 py-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                View Projects
              </Link>
            </div>
            
            {/* Helpful Links */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                You might be interested in:
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link 
                  href="/blog" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Blog Posts
                </Link>
                <Link 
                  href="/awards" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Awards
                </Link>
                <Link 
                  href="/#about" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  About Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
