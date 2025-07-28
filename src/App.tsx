import Footer from "./components/Footer";
import WhereToWatch from "./components/WhereToWatch";
import BeAContestant from "./components/BeAContestant";
import WatchNow from "./components/WatchNow";

function App() {
  const headerMenu = [
    { name: "Watch Now", link: "#watch-now" },
    { name: "Be A Contestant", link: "#be-a-contestant" },
    { name: "Where To Watch", link: "#where-to-watch" },
  ];

  return (
    <>
      {/* Fixed Sponsors Button */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
        <a
          href="/sponsors"
          className="block bg-gradient-to-b from-[#DF2657] to-[#DF2657] hover:from-[#DF2657]  hover:[#DF2657] text-white font-extrabold px-4 py-3 shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-3xl border-l-4 border-[#DF2657]"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            clipPath: "polygon(0 10px, 100% 0, 100% calc(100% - 10px), 0 100%)",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
            minHeight: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            letterSpacing: "2px",
            fontSize: "10px",
          }}
        >
          SPONSORS
        </a>
      </div>
      {/* //add some black overlay shadow to the background sides of the background
      image */}
      <section className="w-full bg-black max-w-4xl">
        <div
          className="width-24 bg-cover w-screen md:h-[90vh] h-auto"
          style={{
            backgroundImage: `url(/images/hero-bg.png)`,
          }}
        >
          <div>
            <div className="flex justify-center items-center p-4 w-full">
              <div className="hidden lg:block flex-1 h-1.5 bg-[#F2B700] rounded-md w-full mr-4"></div>
              <nav className="flex justify-center space-x-1 sm:space-x-3 lg:space-x-4 overflow-x-auto">
                {headerMenu.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetId = item.link.substring(1);
                      const targetElement = document.getElementById(targetId);
                      if (targetElement) {
                        targetElement.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                    className="relative bg-amber-600 px-2 py-2 sm:px-4 sm:py-2 lg:px-8 lg:py-2 transition duration-300 text-xs sm:text-base lg:text-xl text-black text-emphasis-700 font-extrabold border-amber-400 border-2 hover:bg-amber-500 whitespace-nowrap flex-shrink-0"
                    style={{
                      clipPath:
                        "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="hidden lg:block flex-1 h-1.5 bg-[#F2B700] rounded-md w-full ml-4"></div>
            </div>
          </div>
          {/* //THE HERO CONTENT STARTS HERE */}
          <div className="flex flex-col md:flex-row  items-center justify-center h-full text-white">
            <img
              className="w-[400px]"
              // className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 animate-spin-slow"
              src="/images/download.png"
              alt="Host"
            />
            <img src="/images/host-img.png" alt="Host" />
          </div>
        </div>
      </section>
      <section
        className="w-full min-h-24 bg-cover"
        style={{
          backgroundImage: `url(/images/player-background.9ef2f5d4d394f763.jpg)`,
        }}
      >
        <div className="flex justify-center items-center w-full ">
          <div className="py-2 sm:py-4 bg-[#052736] flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-3 lg:space-x-5 w-full max-w-4xl rounded-lg">
            <p className="uppercase font-extrabold text-center sm:text-left">
              <span className="text-xs sm:text-sm text-amber-500">
                Hosted by{" "}
              </span>
              <span className="text-white text-base sm:text-xl font-extrabold">
                Melissa Peterman
              </span>
            </p>

            <p
              className="font-extrabold text-white text-sm sm:text-lg lg:text-xl px-3 py-2 sm:px-4 sm:py-2 lg:px-4 lg:py-2 animate-pulse bg-[#0D476B] whitespace-nowrap"
              style={{
                clipPath:
                  "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              NOW AIRING
            </p>
          </div>
        </div>

        <p className="text-center text-white px-4 py-2 sm:px-6 sm:py-4 lg:px-8 lg:py-6 max-w-3xl mx-auto">
          A modern take on the age-old game of 20 Questions intersperses comedy
          with common knowledge; host People's Choice Award winner Melissa
          Peterman.
        </p>
      </section>
      {/* //BECOME A CONTESTANT SECTION */}
      <WatchNow />
      <BeAContestant />
      <section
        id="where-to-watch"
        className="w-full min-w-full min-h-[100vh] bg-[rgb(1,24,32)]  pt-5 relative z-[100] bg-cover px-4"
      >
        <WhereToWatch />
        <Footer />
      </section>
    </>
  );
}

export default App;
