import ScrollAwareHeader from '@/components/header/Header';
import About from '@/components/landingPage/About';
import Hero from '@/components/landingPage/Hero';
import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page w-full h-[300vh]">
      <ScrollAwareHeader initialBg="bg-transparent" scrolledBg="bg-gray-900" />
      <section id='hero' className="w-full h-[100vh]">
         <Hero />
      </section>
      <section id='about' className="w-full h-[100vh]">
        <About />
      </section>
      <section id='contacts' className="w-full h-[100vh]">
        Contacts
      </section>  
    </div>
  );
};

export default LandingPage;
