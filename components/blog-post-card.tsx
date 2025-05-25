import Link from 'next/link'
import type { BlogPost } from '@/types/blog'
import { Calendar, ArrowRight, Tag, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatDate } from "@/lib/utils";
import Image from 'next/image';

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = formatDate(post.date)

  // Estimate read time based on content length (rough calculation)
  const wordCount = post.content.split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200)) // Assuming 200 words per minute reading speed

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 dark:border-gray-800"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full group">
        <div className="p-5 flex flex-col h-full">
          {/* Top meta info */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" /> {formattedDate}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
          </div>
          
          {/* Bottom elements */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-0.5 rounded-full inline-flex items-center"
                >
                  <Tag className="h-2.5 w-2.5 mr-1" /> {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
            
            <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
              Read article <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
