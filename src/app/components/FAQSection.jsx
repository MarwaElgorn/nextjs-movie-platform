"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "What is StreamVibe?", a: "StreamVibe is a streaming service that allows you to watch movies and shows on demand." },
  { q: "How much does StreamVibe cost?", a: "Plans start at $9.99 per month depending on your region and plan type." },
  { q: "What content is available on StreamVibe?", a: "You can watch new releases, classics, and exclusive originals." },
  { q: "How can I watch StreamVibe?", a: "You can watch on any device, including Smart TVs, phones, and laptops." },
  { q: "How do I sign up for StreamVibe?", a: "Visit our website, create an account, and choose your plan." },
  { q: "What is the StreamVibe free trial?", a: "You can start your 7-day free trial anytime and cancel anytime." },
  { q: "How do I contact StreamVibe support?", a: "Use our help center or live chat from your profile." },
  { q: "What are the StreamVibe payment methods?", a: "We support credit/debit cards and PayPal." },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-[#111010] py-16 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-sm mt-1">
              Got questions? We’ve got answers! Check out our FAQ section to find answers.
            </p>
          </div>
          <button className="btn btn-error btn-sm">Ask a Question</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-[#161616] rounded-lg p-4 border-b border-red-600 hover:border-[#333] transition cursor-pointer"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm w-6 text-center">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <h3 className="font-medium">{item.q}</h3>
                </div>
                {open === i ? (
                  <Minus className="w-4 h-4 text-gray-400" />
                ) : (
                  <Plus className="w-4 h-4 text-gray-400" />
                )}
              </div>
              {open === i && <p className="text-gray-400 text-sm mt-3 ml-9">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
