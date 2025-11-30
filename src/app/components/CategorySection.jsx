"use client";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Action", img: "/action.svg" },
  { name: "Adventure", img: "/adventure.svg" },
  { name: "Comedy", img: "/comedy.svg" },
  { name: "Drama", img: "/drama.svg" },
  { name: "Horror", img: "/horror.svg" },
];

export default function CategorySection() {
  return (
    <section className="py-20  bg-[#0D0D0D] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center py-6 justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold">
              Explore our wide variety of categories
            </h2>
            <p className="text-gray-400 text-sm mt-2  max-w-2xl">
              Whether you are looking for a comedy to make you laugh, a drama to
              make you think, or a documentary to learn something new.
            </p>
          </div>
        </div>

        {/* Categories Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="relative w-full h-64">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-90 hover:opacity-100 transition"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <h3 className="text-sm font-medium">{cat.name}</h3>
                <span className="text-lg">
                  <Link href={`/categories/${cat.name}`}>
                    <Image
                      src="/right-arrow.svg"
                      alt="arrow"
                      width={20}
                      height={20}
                    />
                  </Link>{" "}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
