import React from 'react'
import Image from 'next/image';

const NotFound = () => {
  return (
    <div className="h-screen overflow-hidden flex -mt-28 justify-center items-center">
      <div className="flex flex-col items-center">
        <p className="flex md:text-[250px] text-[170px] items-center justify-center font-bold text-emerald-500">
          <span>4</span>
          <Image
            className="object-contain w-[130px] self-center md:w-[180px] h-auto"
            src="/earth2.gif"
            alt="logo"
            width={180}
            height={180}
          />
          <span>4</span>
        </p>
        <p className="text-gray-700 font-bold capitalize md:-mt-14 -mt-5 text-2xl">
          opps....page not found
        </p>
      </div>
    </div>
  )
}

export default NotFound;
