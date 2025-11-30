export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] text-white pt-20">
      {/* Hero Section */}
      <section className="h-64 animate-pulse bg-gray-800"></section>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>

        {/* Header */}
        <div className="h-8 bg-gray-700 rounded w-48 mb-8 animate-pulse"></div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-96 bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </main>
  );
}
