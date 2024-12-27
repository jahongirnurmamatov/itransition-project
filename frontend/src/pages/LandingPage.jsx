import ScrollAwareHeader from '@/components/header/Header';
import About from '@/components/landingPage/About';
import Contact from '@/components/landingPage/Contact';
import Hero from '@/components/landingPage/Hero';
import Popular from '@/components/landingPage/Popular';
import Recent from '@/components/landingPage/Recent';
import { useTemplateStore } from '@/store/templateStore';
import React, { useEffect } from 'react';

const LandingPage = () => {
  const {getPopularTemplates} = useTemplateStore();
  useEffect(()=>{
    getPopularTemplates();
  },[]);

  return (
    <div className="landing-page w-full h-[500vh]">
      <ScrollAwareHeader initialBg="bg-transparent" scrolledBg="bg-gray-900" />
      <section id='hero' className="w-full h-[100vh]">
         <Hero />
      </section>
      <section id='about' className="w-full h-[100vh]">
        <About />
      </section>
      <section id='popular' className="w-full h-[100vh]">
        <Popular />
      </section>
      <section id='recent' className="w-full h-[100vh]">
        <Recent />
      </section>
      <section id='contact' className="w-full mt-40 ">
         <Contact />
      </section>  
    </div>
  );
};

export default LandingPage;
