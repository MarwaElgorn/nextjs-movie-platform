import { Laptop, Smartphone, Tablet, Tv, Gamepad2, Headphones } from "lucide-react";

const devices = [
  {
    name: "Smartphones",
    icon: <Smartphone className="w-6 h-6 text-red-700" />,
  },
  {
    name: "Tablet",
    icon: <Tablet className="w-6 h-6 text-red-700" />,
  },
  {
    name: "Smart TV",
    icon: <Tv className="w-6 h-6 text-red-700" />,
  },
  {
    name: "Laptops",
    icon: <Laptop className="w-6 h-6 text-red-700" />,
  },
  {
    name: "Gaming Consoles",
    icon: <Gamepad2 className="w-6 h-6 text-red-700" />,
  },
  {
    name: "VR Headsets",
    icon: <Headphones className="w-6 h-6 text-red-700" />,
  },
];

export default function DevicesSection() {
  return (
    <section className="py-20 bg-[#0B0B0B] text-white">
      <div className="max-w-6xl mx-auto  px-4">
        <h2 className="text-2xl font-semibold mb-3">
          We Provide you streaming experience across various devices.
        </h2>
        <p className="text-gray-400 text-sm mb-10 max-w-2xl">
          With StreamVibe, you can enjoy your favorite movies and TV shows
          anytime, anywhere. Our platform is designed to be compatible with a
          wide range of devices, ensuring that you never miss a moment of
          entertainment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  p-6 rounded-xl">
          {devices.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-gradient-to-l from-[#140000] to-black rounded-xl p-6 hover:bg-[#252525] transition"
            >
              <div className="bg-[#2B2B2B] p-3 rounded-lg">{item.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400 mt-2">
                  StreamVibe is optimized for both Android and iOS. Download our
                  app from Google Play or the Apple App Store.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
