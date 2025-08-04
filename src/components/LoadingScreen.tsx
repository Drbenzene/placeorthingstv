import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Animated Background Gradient */}
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background: `linear-gradient(135deg, 
            #591D0C 0%, 
            #6C2F13 25%, 
            #83461B 50%, 
            #AA6C2A 75%, 
            #B2742D 100%)`,
          animation: "gradientShift 3s ease-in-out infinite alternate",
        }}
      />

      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Pumping Logo Container */}
        <div className="relative mb-8">
          {/* Glow Effect */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, #FFAA00 0%, #F2B700 50%, transparent 70%)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />

          {/* Logo */}
          <img
            src="/images/logo.png"
            alt="Loading"
            className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
            style={{
              filter: "drop-shadow(0 0 20px rgba(255, 170, 0, 0.5))",
              animation: "logoPump 1.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="font-secondary font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
            WEEKEND KPAJE
          </h2>
          {/* <p className="font-primary text-[#FFAA00] text-lg sm:text-xl font-semibold animate-pulse">
            Loading Amazing Experience...
          </p> */}
        </div>

        {/* Loading Animation Dots */}
        <div className="flex space-x-2 mt-8">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-3 h-3 bg-[#FFAA00] rounded-full"
              style={{
                animation: `dotBounce 1.4s ease-in-out infinite both`,
                animationDelay: `${index * 0.16}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#FFAA00] rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
