import React from "react";

const logos = [
  "/logos/zomato.png",
  "/logos/paytm.png",
  "/logos/swiggy.png",
  "/logos/razorpay.png",
  "/logos/zerodha.svg",
];

const StartupSlider = () => {
  return (
    <div id="brand-showcase" className="w-[80%] mx-auto overflow-hidden bg-white py-6">
      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm md:text-base font-medium uppercase tracking-wider mb-16">
          Trusted by the ideas inspired by India’s top startups
        </p>
      </div>
      
      <div className="relative w-full">
        {/* Gradients for smooth fade effect at edges */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex gap-16 animate-marquee whitespace-nowrap items-center">
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="startup logo"
              className="h-8 md:h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartupSlider;
