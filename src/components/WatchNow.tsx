import { use, useState } from "react";
import Slider from "react-slick";
import YouTube from "react-youtube";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../slick.css";
import { getVideos } from "../actions/states";
interface VideoDto {
  id: string;
  title: string;
  videoId: string;
  thumbnail: string;
}
const videoPromises = getVideos();

function WatchNow() {
  const videoResponses = use(videoPromises);
  const videos = videoResponses?.data || [];
  const [currentVideoId, setCurrentVideoId] = useState(videos[0]?.videoId);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoSelect = (videoId: string, index: number) => {
    setCurrentVideoId(videoId);
    setCurrentVideoIndex(index);
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      fs: 1,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 0,
    },
    style: {
      width: "100%",
      height: "100%",
    },
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section
      id="watch-now"
      className="w-full min-h-[60vh] bg-cover py-8 px-4 "
      // style={{
      //   backgroundImage: `url(/images/player-background.9ef2f5d4d394f763.jpg)`,
      // }}
      style={{
        background: `linear-gradient(100deg, 
              #591D0C 0%, 
              #6C2F13 20%, 
              #83461B 40%, 
              #935622 60%, 
              #AA6C2A 80%, 
              #B2742D 100%)`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Video Player */}
        <div className="flex justify-center mb-8 relative">
          <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-2xl bg-black border-8 border-amber-400 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl group">
            {/* Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-lg blur opacity-0 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>

            {/* Animated Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-300 transform -translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce"></div>
            <div
              className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-300 transform translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-amber-300 transform -translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-300 transform translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></div>

            {/* Animated Header */}
            <div className="absolute text-center w-1/2 top-0 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-300 hover:scale-110">
              <p
                className="bg-[#FFAA00] px-2 py-2 sm:px-4 sm:py-2 lg:px-8 lg:py-2 transition-all duration-300 text-xs sm:text-base lg:text-xl text-white text-emphasis-700 font-extrabold border-amber-400 border-2 hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-500 hover:shadow-lg whitespace-nowrap flex-shrink-0 animate-pulse"
                style={{
                  clipPath:
                    "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
                  animation: "pulseGlow 2s ease-in-out infinite",
                }}
              >
                WATCH NOW
              </p>
            </div>

            {/* Loading Animation Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 z-25 pointer-events-none"
              id="video-loading"
            >
              <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            </div>

            <YouTube
              videoId={currentVideoId}
              opts={opts}
              className="absolute inset-0 w-full h-full transition-all duration-500 z-10"
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              onReady={() => {
                // Hide loading animation when video is ready
                const loadingEl = document.getElementById("video-loading");
                if (loadingEl) loadingEl.style.opacity = "0";
              }}
            />

            {/* Floating Particles - Lower z-index and pointer-events-none */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-30 pointer-events-none"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${20 + (i % 3) * 30}%`,
                    animation: `floatParticle ${4 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Video Navigation with Arrows */}
        <div className="relative max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex items-center">
            <div className="w-full">
              <Slider {...sliderSettings}>
                {videos &&
                  videos?.map((video: VideoDto, index: number) => (
                    <div key={video.id} className="px-1 sm:px-2">
                      <div
                        onClick={() => handleVideoSelect(video.videoId, index)}
                        className={`cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group ${
                          currentVideoIndex === index
                            ? "border-4 border-amber-400 shadow-2xl scale-105 -translate-y-1"
                            : "hover:shadow-xl"
                        }`}
                      >
                        <div className="relative bg-black rounded-lg overflow-hidden mx-1">
                          {/* Hover Glow Effect */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-lg blur opacity-0 group-hover:opacity-50 transition-all duration-300 pointer-events-none"></div>

                          <div className="relative w-full h-40 sm:h-48 md:h-52 lg:h-56">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                            />
                          </div>

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300 animate-pulse shadow-lg">
                              <div className="w-0 h-0 border-l-[8px] sm:border-l-[12px] border-l-white border-t-[6px] sm:border-t-[8px] border-t-transparent border-b-[6px] sm:border-b-[8px] border-b-transparent ml-1"></div>
                            </div>
                          </div>

                          {/* Active Video Indicator */}
                          {currentVideoIndex === index && (
                            <div className="absolute top-2 right-2 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-ping"></div>
                          )}

                          {/* Video Title Section */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-2 sm:p-3 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <h3 className="text-white text-xs sm:text-sm font-semibold font-secondary line-clamp-2 leading-tight">
                              {video.title}
                            </h3>
                            <div className="w-0 group-hover:w-full h-0.5 bg-amber-400 transition-all duration-500 mt-1"></div>
                          </div>

                          {/* Selection Border Animation */}
                          {currentVideoIndex === index && (
                            <div className="absolute inset-0 border-2 border-amber-400 rounded-lg animate-pulse pointer-events-none"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WatchNow;
