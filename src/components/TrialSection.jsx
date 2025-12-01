import React from "react";

/**
 * Trial Section Component
 * Call-to-action section for free trial signup
 * Server component - no interactivity needed
 */
export default function TrialSection() {
  return (
    <section className="bg-cover bg-[#111010] bg-center py-20 text-white">
      <div
        className="py-20 px-8 max-w-5xl mx-auto rounded-xl flex flex-col md:flex-row justify-between items-center"
        style={{
          backgroundImage: "url('/trial.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h2 className="text-3xl font-semibold mb-2">
            Start your free trial today!
          </h2>
          <p className="text-gray-400 text-sm">
            A clear and concise call to action that encourages users to sign up
            for a free trial.
          </p>
        </div>
        <button className="btn bg-red-600 border-none px-4 hover:bg-red-700 mt-6 md:mt-0">
          Start a Free Trial
        </button>
      </div>
    </section>
  );
}
