import React from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate =useNavigate();
  return (
    <div className=" w-full min-h-[100vh] flex items-center justify-center">
      <div className="sm:flex sm:flex-row flex-col gap-5 md:px-20 px-5 ">
        <div className="sm:w-1/2 h-1/2 sm:h-full flex flex-col justify-center items-start">
          <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-100">Start Creating <br /> Your Forms...</h1>
          <p className="mt-4 line-clamp-2 md:line-clamp-4 lg:text-lg md:text-md text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam ipsum impedit repudiandae incidunt assumenda
            laboriosam, itaque, earum aspernatur temporibus cupiditate obcaecati!
          </p>
          <Button onClick={() => {navigate('/login')}} className="w-[200px] mt-6 hover:opacity-80">Get Started</Button>
        </div>
        <div className="sm:w-1/2 h-1/2 sm:h-full flex mt-5 md:mt-0 items-center justify-center">
          <div className="w-full h-[300px] lg:h-full  bg-transparent rounded-lg flex items-center justify-center">
                <img className='object-cover rounded-lg lg:w-[80%] md:w-[90%] h-[90%]  sm:h-[100%] sm:w-full' src="/heroImg.webp" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
