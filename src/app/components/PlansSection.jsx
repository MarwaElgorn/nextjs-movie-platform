"use client";
import { useState } from "react";
import Link from "next/link";


const plans = [
  {
    name: "Basic Plan",
    monthly: 9.99,
    yearly: 99.99,
    desc: "Enjoy a library of movies and shows, including recently released titles.",
  },
  {
    name: "Standard Plan",
    monthly: 12.99,
    yearly: 129.99,
    desc: "Access a wider selection of titles including new releases and exclusive content.",
  },
  {
    name: "Premium Plan",
    monthly: 14.99,
    yearly: 149.99,
    desc: "All-access plan with 4K viewing and offline downloads.",
  },
];

export default function PlansSection() {
  const [active, setActive] = useState("monthly");

  return (
    <section className="bg-[#0D0D0D] py-20 text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title + Toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-semibold">
              Choose the plan that’s right for you
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences.
            </p>
          </div>

          {/* Toggle Button Group */}
          <div className="flex items-center mt-4 md:mt-0 bg-[#111] border border-[#333] rounded-lg overflow-hidden">
            <button
              onClick={() => setActive("monthly")}
              className={`px-5 py-2 text-sm transition-colors ${
                active === "monthly"
                  ? "bg-[#1A1A1A] text-white"
                  : "text-gray-400 hover:bg-[#222]"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setActive("yearly")}
              className={`px-5 py-2 text-sm transition-colors ${
                active === "yearly"
                  ? "bg-[#1A1A1A] text-white"
                  : "text-gray-400 hover:bg-[#222]"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="bg-[#1A1A1A] rounded-xl p-8 flex flex-col justify-between hover:bg-[#222] transition"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-5">{plan.desc}</p>
                <p className="text-4xl font-bold mb-1">
                  ${active === "monthly" ? plan.monthly : plan.yearly}
                </p>
                <p className="text-sm text-gray-400">
                  /{active === "monthly" ? "month" : "year"}
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <button className="btn bg-transparent border border-gray-600 hover:bg-black hover:text-red-500 hover:border-none">
         <Link href={"/movies"}>  Start a Free Trial</Link>
                </button>
                <button className="btn bg-red-600 border-none hover:bg-red-700">
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
