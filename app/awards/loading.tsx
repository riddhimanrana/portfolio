export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-pulse">
          <div className="h-12 w-64 bg-gray-800 rounded-lg mx-auto mb-4"></div>
          <div className="h-4 w-full max-w-md mx-auto bg-gray-800 rounded"></div>
        </div>

        <div className="max-w-xl mx-auto mb-12 animate-pulse">
          <div className="h-12 w-full bg-gray-800 rounded-xl"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex animate-pulse">
              <div className="mr-4 w-12 h-12 bg-gray-800 rounded-full"></div>
              <div className="flex-1">
                <div className="h-24 bg-gray-800/60 rounded-xl w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
