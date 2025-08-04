import { useState } from "react";
import Header from "./Header";

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  website: string;
  category: string;
  description: string;
}

const sponsorsData: Sponsor[] = [
  {
    id: 9,
    name: "Entwitainment",
    logo: "/images/sponsors/sponsor.svg",
    website: "https://entwitainment.com/",
    category: "Media",
    description: "Leading Advertising, Media and Production company",
  },
];

const categories = ["All", "Media"];

function Sponsors() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSponsors =
    selectedCategory === "All"
      ? sponsorsData
      : sponsorsData.filter((sponsor) => sponsor.category === selectedCategory);

  const handleSponsorClick = (website: string) => {
    window.open(website, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#591D0C] via-[#83461B] to-[#B2742D] py-12 px-4">
      <Header />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mt-5 mb-12">
          <h1 className="font-secondary text-4xl md:text-6xl font-extrabold text-white mb-4">
            OUR <span className="text-[#FFAA00]">SPONSORS</span>
          </h1>
          <p className="font-primary text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
            We are grateful to our amazing sponsors who make Weekend KPAJE
            possible. These incredible partners support our mission to bring
            entertainment and excitement to audiences everywhere.
          </p>

          {/* Animated Decorative Line */}
          <div className="flex justify-center items-center mb-8">
            <div className="h-1 w-16 bg-[#FFAA00] rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-[#FFAA00] rounded-full mx-4 animate-bounce"></div>
            <div className="h-1 w-16 bg-[#FFAA00] rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 cursor-pointer rounded-full font-secondary font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? "bg-[#FFAA00] text-black shadow-lg scale-105"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredSponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              onClick={() => handleSponsorClick(sponsor.website)}
              className="group cursor-pointer bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FFAA00] to-[#B2742D] rounded-xl blur opacity-0 group-hover:opacity-75 transition-all duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Logo Container */}
                <div className="h-24 flex items-center justify-center mb-4 bg-gray-50 rounded-lg p-4 group-hover:bg-gray-100 transition-all duration-300">
                  {/* Placeholder for logo - you can replace this with actual logo images */}
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} Logo`}
                    className="h-16 w-16 object-contain mb-2"
                  />
                </div>

                {/* Sponsor Name */}
                <h3 className="font-secondary text-lg font-bold text-gray-800 text-center mb-2 group-hover:text-[#591D0C] transition-colors duration-300">
                  {sponsor.name}
                </h3>

                {/* Category Badge */}
                <div className="flex justify-center mb-3">
                  <span className="px-3 py-1 bg-[#FFAA00]/20 text-[#591D0C] text-xs font-semibold rounded-full">
                    {sponsor.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm text-center group-hover:text-gray-700 transition-colors duration-300">
                  {sponsor.description}
                </p>

                {/* Hover Indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-6 h-6 bg-[#FFAA00] rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>

                {/* Animated Bottom Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#FFAA00] to-[#B2742D] group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-black/20 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="font-secondary text-2xl md:text-3xl font-bold text-white mb-4">
            Interested in Sponsoring Weekend KPAJE?
          </h2>
          <p className="font-primary text-white/90 mb-6 max-w-2xl mx-auto">
            Join our family of sponsors and reach thousands of engaged viewers.
            Contact us to learn about our sponsorship opportunities.
          </p>
          <a
            href="mailto:twitwi@entwitainment.com"
            className="inline-block bg-[#FFAA00] text-black font-secondary font-bold px-8 py-4 rounded-full hover:bg-[#B2742D] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Become a Sponsor
          </a>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              window.history.pushState({}, "", "/");
              window.location.reload();
            }}
            className="inline-flex items-center space-x-2 text-white hover:text-[#FFAA00] transition-all duration-300 font-secondary font-semibold"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-[#FFAA00]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${
                4 + Math.random() * 2
              }s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Sponsors;
