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
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative bg-white dark:bg-gray-900/50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/60 dark:border-gray-800/60"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none" />
      
      <Link href={`/blog/${post.slug}`} className="block h-full relative">
        <div className="p-6 flex flex-col h-full">
          {/* Top meta info */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> 
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              <span>{readTime} min read</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
          </div>
          
          {/* Bottom elements */}
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/50">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-md font-medium"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 px-2.5 py-1 rounded-md">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
            
            <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
              Read article 
              <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
