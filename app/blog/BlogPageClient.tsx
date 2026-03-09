'use client'

import React, { useState, useRef, useEffect } from 'react';
import type { BlogPost } from '@/types/blog';
import { BlogPostCard } from '@/components/blog-post-card'
import { FileText, Search, Tag as TagIcon, X, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tagsContainerRef = useRef<HTMLDivElement>(null);

  // Get all unique tags from posts
  const allTags = React.useMemo(() => {
    const tags = posts.flatMap(post => post.tags);
    return Array.from(new Set(tags)).sort();
  }, [posts]);

  // Filter posts based on search term and selected tag
  const filteredPosts = React.useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [posts, searchTerm, selectedTag]);

  // Check if arrows should be shown
  const checkArrowsVisibility = () => {
    if (tagsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tagsContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 2); // -2 to account for rounding errors
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const tagsContainer = tagsContainerRef.current;
    if (tagsContainer) {
      checkArrowsVisibility();
      tagsContainer.addEventListener('scroll', checkArrowsVisibility);
      
      // Check on resize too
      window.addEventListener('resize', checkArrowsVisibility);
      
      // Initial check after content might have rendered
      const timeoutId = setTimeout(checkArrowsVisibility, 100);
      
      return () => {
        tagsContainer.removeEventListener('scroll', checkArrowsVisibility);
        window.removeEventListener('resize', checkArrowsVisibility);
        clearTimeout(timeoutId);
      };
    }
  }, [allTags]); // Re-run if tags change, affecting scrollWidth
  
  const scrollTagsRight = () => {
    if (tagsContainerRef.current) {
      tagsContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
    setTimeout(checkArrowsVisibility, 300); // Check after scroll animation
  }
  
  const scrollTagsLeft = () => {
    if (tagsContainerRef.current) {
      tagsContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
    setTimeout(checkArrowsVisibility, 300); // Check after scroll animation
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-sm mr-4 shrink-0">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">My Blog</h1>
              <p className="text-muted-foreground text-sm">Thoughts, tutorials, and insights</p>
            </div>
          </div>
          
          {/* Search input */}
          <div className="relative w-full md:w-60 group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-9 py-2 text-sm bg-card text-card-foreground border border-border rounded-sm focus:ring-1 focus:ring-ring focus:border-transparent outline-none transition-all placeholder:text-muted-foreground"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>
        
        {/* Tags filter */}
        {allTags.length > 0 && (
          <div className="mb-6 relative">
            <div 
              ref={tagsContainerRef}
              className="overflow-x-auto scrollbar-hide"
            >
              <div className="flex gap-1.5 pb-2 min-w-max">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1.5 rounded-sm border text-xs font-medium transition-all ${
                    selectedTag === null
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-card border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  All Posts
                </button>
                
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={`px-3 py-1.5 rounded-sm border text-xs font-medium transition-all inline-flex items-center gap-1 ${
                      selectedTag === tag
                        ? 'bg-primary/10 border-primary/30 text-primary'
                        : 'bg-card border-border text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <TagIcon className="h-3 w-3" /> {tag}
                  </button>
                ))}
              </div>
            </div>
            
            {showLeftArrow && (
              <button 
                onClick={scrollTagsLeft}
                className="absolute left-0 top-1/4 -translate-y-1/3 bg-card/90 backdrop-blur-xl border border-border rounded-full p-1.5 drop-shadow-xl hover:bg-muted transition-colors z-10"
                aria-label="Scroll tags left"
              >
                <ChevronRight className="h-4 w-4 text-muted-foreground rotate-180" />
              </button>
            )}
            
            {showRightArrow && (
              <button 
                onClick={scrollTagsRight}
                className="absolute right-0 top-1/4 -translate-y-1/3 bg-card/90 backdrop-blur-xl border border-border rounded-full p-1.5 drop-shadow-xl hover:bg-muted transition-colors z-10"
                aria-label="Scroll tags right"
              >
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
            
            {showLeftArrow && (
              <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-[5]"></div>
            )}
            
            {showRightArrow && (
              <div className="absolute right-0 top-0 w-10 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-[5]"></div>
            )}
          </div>
        )}

        {/* Post grid */}
        {filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
            
            <div className="text-center text-sm text-muted-foreground mt-10">
              Showing {filteredPosts.length} of {posts.length} posts
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-muted/40 rounded-sm border border-border">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-muted rounded-full mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No matching posts found</h3>
            <p className="text-muted-foreground mb-5 max-w-md mx-auto text-sm">
              {searchTerm ? `No posts match "${searchTerm}"` : "No posts found with the selected filters."}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTag(null);
              }}
              className="px-5 py-1.5 bg-primary text-primary-foreground text-sm rounded-sm hover:opacity-90 transition-opacity"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}