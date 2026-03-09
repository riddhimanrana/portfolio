export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <article className="mx-auto max-w-3xl lg:max-w-4xl">
          {/* Navigation and tags section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <div className="h-6 w-32 bg-muted rounded animate-pulse mb-4 sm:mb-0"></div>
            
            <div className="flex gap-1.5">
              <div className="h-5 w-14 bg-muted rounded-sm animate-pulse"></div>
              <div className="h-5 w-16 bg-muted rounded-sm animate-pulse"></div>
              <div className="h-5 w-12 bg-muted rounded-sm animate-pulse"></div>
            </div>
          </div>
          
          {/* Post header */}
          <header className="mb-6">
            <div className="h-9 w-4/5 bg-muted rounded animate-pulse mb-3"></div>
            <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
          </header>
          
          {/* Post content */}
          <div className="bg-card rounded-sm border border-border p-5 sm:p-8">
            <div className="space-y-5">
              {/* Simulating markdown content */}
              <div className="h-6 w-1/2 bg-muted rounded animate-pulse"></div>
              
              <div className="space-y-3">
                <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-muted rounded animate-pulse"></div>
              </div>
              
              {/* Code block */}
              <div className="rounded-sm overflow-hidden">
                <div className="h-6 w-full bg-muted animate-pulse"></div>
                <div className="h-32 w-full bg-muted/50 animate-pulse"></div>
              </div>
              
              <div className="space-y-3">
                <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Post footer */}
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="h-8 w-32 bg-muted rounded animate-pulse mb-4 sm:mb-0"></div>
              <div className="h-4 w-28 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
