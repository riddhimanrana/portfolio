export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-lg mr-4 animate-pulse"></div>
            <div>
              <div className="h-7 w-36 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-1"></div>
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            </div>
          </div>
          
          {/* Search input */}
          <div className="w-full md:w-60">
            <div className="h-9 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
        
        {/* Tags filter */}
        <div className="mb-6 flex gap-1.5 pb-2">
          <div className="h-7 w-20 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
          <div className="h-7 w-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
          <div className="h-7 w-24 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
          <div className="h-7 w-20 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-gray-800">
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                </div>
                
                <div className="h-6 w-5/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4"></div>
                
                <div className="flex gap-1.5 mb-3">
                  <div className="h-5 w-14 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
                </div>
                
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
