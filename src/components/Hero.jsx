import React from "react";
import Link from "next/link";

/**
 * Hero Section Component
 * Landing page hero with background image and CTA button
 * Server component - no interactivity needed
 */
export default function Hero() {
  return (
    <>
      <section className="h-screen bg-[url('/headercontainer.png')] bg-cover bg-center relative flex flex-col justify-end items-center">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="z-10 max-w-2xl pt-32 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            The Best Streaming Experience
          </h1>
          <p className="text-gray-300 mb-6">
            StreamVibe is the best streaming experience for watching your
            favorite movies and shows on demand, anytime, anywhere.
          </p>
          <button className="btn bg-red-700 border-none hover:bg-red-800 hover:shadow-lg text-white px-10">
            <Link href={"/movies"}> Start Watching Now</Link>
          </button>
        </div>
      </section>
    </>
  );
}
