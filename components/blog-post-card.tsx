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
      className="group relative bg-card rounded-sm overflow-hidden card-hover border border-border"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full relative">
        <div className="p-6 flex flex-col h-full">
          {/* Top meta info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> 
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{readTime} min read</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">{post.title}</h3>
            <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
          </div>
          
          {/* Bottom elements */}
          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-sm font-medium"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-sm">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
            
            <div className="flex items-center text-primary text-sm font-medium">
              Read article 
              <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
