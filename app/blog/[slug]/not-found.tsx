import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto text-center">
          <div className="bg-card rounded-sm border border-border shadow-sm p-10 sm:p-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-sm mb-8">
              <ArrowLeft className="h-10 w-10 text-muted-foreground" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Post Not Found</h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              The blog post you are looking for doesn't exist or has been removed.
            </p>
            
            <Link 
              href="/blog" 
              className="inline-flex items-center px-8 py-4 bg-foreground text-background font-medium rounded-sm hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="h-5 w-5 mr-2" /> Back to all posts
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
