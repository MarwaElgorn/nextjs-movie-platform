export default function MoviesLoading() {
  return (
    <main className="bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] text-white min-h-screen pt-20">
      {/* Featured Hero Skeleton */}
      <section className="h-screen animate-pulse">
        <div className="w-full h-full bg-gray-800"></div>
      </section>

      {/* Movies Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-20">
        {[1, 2, 3].map((section) => (
          <div key={section} className="space-y-8">
            <div className="h-8 bg-gray-700 rounded w-48 animate-pulse"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((movie) => (
                <div
                  key={movie}
                  className="h-80 bg-gray-700 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
