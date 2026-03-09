export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header skeleton */}
        <div className="text-center mb-12 animate-pulse">
          <div className="h-12 w-64 bg-muted rounded-sm mx-auto mb-4"></div>
          <div className="h-4 w-full max-w-md mx-auto bg-muted rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Timeline sidebar skeleton */}
          <div className="hidden lg:block lg:col-span-1 bg-card border border-border rounded-sm p-4 h-[calc(100vh-12rem)] animate-pulse">
            <div className="h-8 w-32 bg-muted rounded mb-6"></div>
            
            {/* Timeline items skeleton */}
            <div className="space-y-8">
              {[1, 2, 3].map((year) => (
                <div key={`year-${year}`}>
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-sm bg-muted"></div>
                    <div className="h-5 w-16 bg-muted rounded ml-3"></div>
                  </div>
                  
                  <div className="ml-4 space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div 
                        key={`year-${year}-item-${item}`} 
                        className="h-14 bg-muted/60 rounded-sm w-full"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-3">
            {/* Search and filter controls skeleton */}
            <div className="mb-8 animate-pulse">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="h-12 bg-muted rounded-sm flex-grow"></div>
                <div className="h-12 w-48 bg-muted rounded-sm flex-shrink-0"></div>
              </div>
              
              {/* Filter pills skeleton */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={`filter-${i}`} className="h-8 w-20 bg-muted rounded-sm"></div>
                ))}
              </div>
            </div>

            {/* Grid view skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-card border border-border rounded-sm overflow-hidden">
                    <div className="h-1 w-full bg-muted"></div>
                    <div className="p-4">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-muted rounded-sm"></div>
                        <div className="ml-4 space-y-2">
                          <div className="h-5 w-32 bg-muted rounded"></div>
                          <div className="h-4 w-24 bg-muted rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded"></div>
                        <div className="h-4 w-3/4 bg-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
