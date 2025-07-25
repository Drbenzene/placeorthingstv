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

  console.log("Available videos:", videos);

  //   const videos = [
  //     {
  //       id: "dQw4w9WgXcQ",
  //       title: "Episode 1: Getting Started",
  //       thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  //     },
  //     {
  //       id: "9bZkp7q19f0",
  //       title: "Episode 2: Advanced Techniques",
  //       thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
  //     },
  //     {
  //       id: "kJQP7kiw5Fk",
  //       title: "Episode 3: Expert Tips",
  //       thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
  //     },
  //     {
  //       id: "8UVNT4wvIGY",
  //       title: "Episode 4: Behind the Scenes",
  //       thumbnail: "https://img.youtube.com/vi/8UVNT4wvIGY/maxresdefault.jpg",
  //     },
  //     {
  //       id: "ZbZSe6N_BXs",
  //       title: "Episode 5: Special Edition",
  //       thumbnail: "https://img.youtube.com/vi/ZbZSe6N_BXs/maxresdefault.jpg",
  //     },
  //     {
  //       id: "L_jWHffIx5E", // Replace with actual video ID
  //       title: "Episode 6: Season Finale",
  //       thumbnail: "https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg",
  //     },
  //   ];
  const [currentVideoId, setCurrentVideoId] = useState(videos[0]?.videoId);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoSelect = (videoId: string, index: number) => {
    setCurrentVideoId(videoId);
    setCurrentVideoIndex(index);
  };

  const opts = {
    height: "400",
    width: "9000",
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
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section
      id="watch-now"
      className="w-full min-h-[60vh] bg-cover py-8 px-4 "
      style={{
        backgroundImage: `url(/images/player-background.9ef2f5d4d394f763.jpg)`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Video Player */}
        <div className="flex justify-center mb-8 relative">
          {/* Left Arrow - positioned very close to the amber border */}
          {/* <button
              onClick={() => {
                const prevIndex =
                  currentVideoIndex > 0
                    ? currentVideoIndex - 1
                    : videos.length - 1;
                handleVideoSelect(videos[prevIndex].id, prevIndex);
              }}
              className="absolute top-1/2 transform -translate-y-1/2 left-[-45px] z-10 w-12 h-12 bg-amber-600 hover:bg-amber-500 rounded-full flex items-center justify-center text-black font-bold transition-all duration-300 shadow-lg"
            >
              &#8249;
            </button> */}

          <div className="relative w-full max-w-2xl p-6 flex justify-center items-center rounded-lg overflow-hidden shadow-2xl bg-black border-8 border-amber-400">
            <p
              className="absolute  text-center w-1/2 top-0 z-10 bg-amber-600 px-2 py-2 sm:px-4 sm:py-2 lg:px-8 lg:py-2 transition duration-300 text-xs sm:text-base lg:text-xl text-black text-emphasis-700 font-extrabold border-amber-400 border-2 hover:bg-amber-500 whitespace-nowrap flex-shrink-0"
              style={{
                clipPath:
                  "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
              }}
            >
              WATCH NOW
            </p>
            <YouTube
              videoId={currentVideoId}
              opts={opts}
              className="youtube-player w-full h-full"
            />
          </div>

          {/* Right Arrow - positioned very close to the amber border */}
          {/* <button
              onClick={() => {
                const nextIndex =
                  currentVideoIndex < videos.length - 1
                    ? currentVideoIndex + 1
                    : 0;
                handleVideoSelect(videos[nextIndex].id, nextIndex);
              }}
              className="absolute top-1/2 transform -translate-y-1/2 right-[-45px] z-10 w-12 h-12 bg-amber-600 hover:bg-amber-500 rounded-full flex items-center justify-center text-black font-bold transition-all duration-300 shadow-lg"
            >
              &#8250;
            </button> */}
        </div>

        {/* Video Navigation with Arrows */}
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center">
            <div className="w-full px-4">
              <Slider {...sliderSettings}>
                {videos &&
                  videos?.map((video: VideoDto, index: number) => (
                    <div key={video.id} className="px-2">
                      <div
                        onClick={() => handleVideoSelect(video.videoId, index)}
                        className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          currentVideoIndex === index
                            ? " border-4 border-amber-400 shadow-xl"
                            : "hover:shadow-lg"
                        }`}
                      >
                        <div className="relative bg-black rounded-lg overflow-hidden">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-32 sm:h-40 object-cover"
                          />

                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                            <h3 className="text-white text-xs sm:text-sm font-semibold truncate">
                              {video.title}
                            </h3>
                          </div>
                          {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                              <div className="w-0 h-0 border-l-[8px] border-l-black border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                            </div>
                          </div> */}
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
