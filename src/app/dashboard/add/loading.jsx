export default function DashboardAddLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] text-white p-6 pt-20">
      <div className="max-w-2xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-32"></div>
        <div className="h-12 bg-gray-700 rounded"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-gray-700 rounded"></div>
          ))}
        </div>
        <div className="h-32 bg-gray-700 rounded"></div>
        <div className="flex gap-4">
          <div className="flex-1 h-12 bg-gray-700 rounded"></div>
          <div className="w-24 h-12 bg-gray-700 rounded"></div>
        </div>
      </div>
    </main>
  );
}
