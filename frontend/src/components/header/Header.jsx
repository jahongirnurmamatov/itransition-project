import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const ScrollAwareHeader = ({ initialBg, scrolledBg }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
        isScrolled ? scrolledBg : initialBg
      }`}
    >
       <div className="w-[90%] flex items-center justify-center mx-auto py-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-3xl truncate text-white font-semibold">
              My<span className="text-blue-400 font-extrabold">Forms</span>
            </p>
            <div className="flex items-center gap-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'font-semibold text-white px-4 py-2 rounded-md bg-blue-700'
                    : 'font-semibold text-gray-300 px-4 py-2 rounded-md'
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? 'font-semibold text-white px-4 py-2 rounded-md bg-blue-700'
                    : 'font-semibold text-gray-300 px-4 py-2 rounded-md'
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  isActive
                    ? 'font-semibold text-white px-4 py-2 rounded-md bg-blue-700'
                    : 'font-semibold text-gray-300 px-4 py-2 rounded-md'
                }
              >
                Contacts
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'font-semibold text-white px-4 py-2 rounded-md bg-blue-700'
                    : 'font-semibold text-gray-300 px-4 py-2 rounded-md'
                }
              >
                Login
              </NavLink>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ScrollAwareHeader;
