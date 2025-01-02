import React from 'react'

const About = () => {
  return (
    <div className=" w-full min-h-[100vh] flex items-center justify-center">
          <div className="sm:flex sm:flex-row flex-col gap-5 md:px-20 px-5 ">
            <div className="sm:w-1/2 h-1/2 sm:h-full flex flex-col justify-center items-start">
              <div className="flex items-center justify-center">
               <div className="w-[90%]  h-full mx-auto -mt-18">
                    <img className='object-cover rounded-lg' 
                    src="/aboutImg.png" alt="" />
               </div>
              </div>
            </div>
            <div className="sm:w-1/2 flex sm:h-full flex-col justify-center items-center mt-5">
              <h1 className="lg:text-5xl md:text-4xl text-2xl  font-bold text-gray-100  text-center hover:text-orange-500">About us</h1>
              <p className="mt-4 line-clamp-2 md:line-clamp-4  lg:text-lg md:text-md text-gray-300 hover:text-orange-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam ipsum impedit repudiandae incidunt assumenda
                laboriosam, itaque, earum aspernatur temporibus cupiditate obcaecati!
              </p>
            </div>
          </div>
        </div>
  )
}

export default About