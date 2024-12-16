import React from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate =useNavigate();
  return (
    <div className=" w-full min-h-[100vh] flex items-center justify-center">
      <div className="flex gap-5 px-20 ">
        <div className="w-1/2 flex flex-col justify-center items-start">
          <h1 className="text-5xl font-bold text-gray-100">Start creating <br /> Your Forms...</h1>
          <p className="mt-4 text-lg text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam ipsum impedit repudiandae incidunt assumenda
            laboriosam, itaque, earum aspernatur temporibus cupiditate obcaecati!
          </p>
          <Button onClick={() => {navigate('/login')}} className="w-[200px] mt-6 hover:opacity-80">Get Started</Button>
        </div>
        <div className="w-1/2">
          <div className="w-full h-[300px] bg-transparent rounded-lg">
           <div className="w-[90%] h-full mx-auto -mt-28">
                <img className='object-cover rounded-lg' src="https://localo.com/de/assets/img/definitions/what-is-forms.webp" alt="" />
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
