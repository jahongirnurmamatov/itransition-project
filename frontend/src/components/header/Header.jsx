import React, { useState, useEffect } from "react";

const ScrollAwareHeader = ({ initialBg, scrolledBg }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  console.log(activeSection)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      const sections = document.querySelectorAll("section");
      const scrollPos = window.scrollY + 200; 
      sections.forEach((section) => {
        if (
          section.offsetTop <= scrollPos &&
          section.offsetTop + section.offsetHeight > scrollPos
        ) {
          setActiveSection(section.getAttribute("id"));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full h-[72px] fixed top-0 left-0 z-50 transition-colors duration-300 ${
        isScrolled ? scrolledBg : initialBg
      }`}
    >
      <div className="w-[90%] flex items-center justify-center mx-auto py-4">
        <div className="w-full flex justify-between items-center">
          <p className="text-3xl truncate text-white font-semibold">
            My<span className="text-blue-400 font-extrabold">Forms</span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              className={`font-semibold px-4 py-2 rounded-md ${
                activeSection === "hero"
                  ? "text-white bg-blue-600"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </a>
            <a
              href="#about"
              className={`font-semibold px-4 py-2 rounded-md ${
                activeSection === "about"
                  ? "text-white bg-blue-600"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              About
            </a>
            <a
              href="#popular"
              className={`font-semibold px-4 py-2 rounded-md ${
                activeSection === "popular"
                  ? "text-white bg-blue-600"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Popular
            </a>
            <a
              href="#recent"
              className={`font-semibold px-4 py-2 rounded-md ${
                activeSection === "recent"
                  ? "text-white bg-blue-600"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Recent
            </a>
            <a
              href="#contact"
              className={`font-semibold px-4 py-2 rounded-md ${
                activeSection === "contact"
                  ? "text-white bg-blue-600"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Contact
            </a>
            <a
              href="/login"
              className={`font-semibold px-4 py-2 rounded-md ${
                activeSection === "login"
                  ? "text-white bg-blue-600"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollAwareHeader;
