'use client'

import { getAllPosts } from '@/utils/blog'
import { BlogPostCard } from '@/components/blog-post-card'
import { FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BlogPageClient() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-8"
        >
          <FileText className="h-10 w-10 p-2 bg-gray-200 dark:bg-gray-800 rounded-md mr-4" />
          <h1 className="text-3xl font-bold">My Blog</h1>
        </motion.div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  )
}
