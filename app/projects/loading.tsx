export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-muted rounded-sm mr-4 animate-pulse"></div>
            <div>
              <div className="h-7 w-36 bg-muted rounded animate-pulse mb-1"></div>
              <div className="h-4 w-48 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
          
          {/* Search input */}
          <div className="w-full md:w-60">
            <div className="h-9 w-full bg-muted rounded animate-pulse"></div>
          </div>
        </div>
        
        {/* Tags filter */}
        <div className="mb-6 flex gap-1.5 pb-2">
          <div className="h-7 w-24 bg-muted rounded-sm animate-pulse"></div>
          <div className="h-7 w-16 bg-muted rounded-sm animate-pulse"></div>
          <div className="h-7 w-20 bg-muted rounded-sm animate-pulse"></div>
          <div className="h-7 w-18 bg-muted rounded-sm animate-pulse"></div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="bg-card rounded-sm border border-border overflow-hidden">
              <div className="p-3 flex flex-wrap gap-1.5">
                <div className="h-5 w-16 bg-muted rounded-sm animate-pulse"></div>
                <div className="h-5 w-14 bg-muted rounded-sm animate-pulse"></div>
                <div className="h-5 w-12 bg-muted rounded-sm ml-auto animate-pulse"></div>
              </div>
              
              <div className="px-4 pb-4">
                <div className="h-5 w-2/3 bg-muted rounded mb-1.5 animate-pulse"></div>
                <div className="h-4 w-full bg-muted rounded mb-1 animate-pulse"></div>
                <div className="h-4 w-4/5 bg-muted rounded mb-3 animate-pulse"></div>
                
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
