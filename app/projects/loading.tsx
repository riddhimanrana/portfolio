export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center mb-8">
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-md mr-4 animate-pulse"></div>
          <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg h-80 animate-pulse">
              <div className="p-4 flex gap-2">
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              </div>
              <div className="h-48 bg-gray-200 dark:bg-gray-800"></div>
              <div className="p-6">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
