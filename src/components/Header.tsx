function Header() {
  const headerMenu = [
    { name: "Watch Now", link: "#watch-now" },
    { name: "Be A Contestant", link: "#be-a-contestant" },
    { name: "Where To Watch", link: "#where-to-watch" },
  ];
  return (
    <div>
      <div className="flex justify-center items-center p-4 w-full">
        <div className="hidden lg:block flex-1 h-1.5 bg-[#FFAA00] rounded-md w-full mr-4"></div>
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
              className="relative bg-[#FFAA00] text-white px-2 py-2 sm:px-4 sm:py-2 lg:px-8 lg:py-2 transition duration-300 text-xs sm:text-base lg:text-xl text-emphasis-700 font-extrabold border-amber-400 border-2 hover:bg-amber-500 whitespace-nowrap flex-shrink-0"
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
  );
}

export default Header;
