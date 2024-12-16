import ScrollAwareHeader from '@/components/header/Header';
import React from 'react';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <div className="landing-page w-full h-[200vh]">
        <ScrollAwareHeader initialBg="bg-transparent"  scrolledBg="bg-gray-900"/>
        <div className="flex items-center justify-center h-[100vh-]">
          
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
