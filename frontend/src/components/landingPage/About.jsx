import React from 'react'

const About = () => {
  return (
    <div className=" w-full min-h-[100vh] flex items-center justify-center">
          <div className="flex gap-5 px-20 ">
            <div className="w-1/2">
              <div className="w-full h-[300px] bg-transparent rounded-lg">
               <div className="w-[90%] h-full mx-auto -mt-18">
                    <img className='object-cover rounded-lg' 
                    src="https://www.guidingtech.com/wp-content/uploads/edit-google-forms_05be6e9b9d53d1d1680b6ab56f4753b7_4d470f76dc99e18ad75087b1b8410ea9.png" alt="" />
               </div>
              </div>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-start">
              <h1 className="text-5xl font-bold text-gray-100 hover:text-orange-500">About us</h1>
              <p className="mt-4 text-lg text-gray-300 hover:text-orange-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam ipsum impedit repudiandae incidunt assumenda
                laboriosam, itaque, earum aspernatur temporibus cupiditate obcaecati!
              </p>
            </div>
          </div>
        </div>
  )
}

export default About