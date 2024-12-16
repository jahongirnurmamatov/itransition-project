import ScrollAwareHeader from '@/components/header/Header';
import Hero from '@/components/landingPage/Hero';
import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page w-full h-[300vh]">
      <ScrollAwareHeader initialBg="bg-transparent" scrolledBg="bg-gray-900" />
      <div className="w-full h-[100vh]">
         <Hero />
      </div>
      <div className="w-full h-[100vh]">
        About us
      </div>
      <div className="w-full h-[100vh]">
        Contacts
      </div>
      
    </div>
  );
};

export default LandingPage;
