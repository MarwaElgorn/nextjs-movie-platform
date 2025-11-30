export default function MovieDetailLoading() {
  return (
    <main className="bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] text-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="h-screen animate-pulse bg-gray-800"></section>

      {/* Details Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="h-8 bg-gray-700 rounded w-48 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-8 h-96 animate-pulse bg-gray-700"></div>
        </div>
      </section>
    </main>
  );
}
