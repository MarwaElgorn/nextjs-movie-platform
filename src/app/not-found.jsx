import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[#0D0D0D] text-white text-center px-6">
      <Image
        src="/404.svg"
        alt="Not Found"
        width={400}
        height={400}
        className="mb-8 object-contain"
        priority
      />

      <h1 className="text-4xl font-bold mb-3">Page Not Found</h1>
      <p className="text-gray-400 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="bg-red-600 px-6 py-3 rounded-md hover:bg-red-700 transition"
      >
        Back to Home
      </Link>
    </main>
  );
}
