import { useEffect, useState } from 'react';
import img1 from './food_pictures/picture1.png';
import img2 from './food_pictures/picture2.png';
import img3 from './food_pictures/picture3.png';
import img4 from './food_pictures/picture4.png';
import img5 from './food_pictures/picture5.png';
import img6 from './food_pictures/picture6.png';
import img7 from './food_pictures/picture7.png';

const Foods = () => {
  const imageList = [img1, img2, img3, img7, img4, img5, img6];

  return (
    <div className="flex justify-between md:order-2 lg:py-16 md:py-12 sm:py-10 py-6 w-full container max-w-[90rem] mx-auto px-5">
      {imageList.map((item, index) =>
        index === Math.round(imageList.length / 2) - 1 ? (
          <img key={index} src={item} className="lg:-mt-8 md:-mt-7 sm:-mt-6 -mt-3 xl:w-36 xl:h-36 lg:w-28 lg:h-28 md:w-20 md:h-20 sm:w-16 sm:h-16 w-12 h-12" />
        ) : (
          <img key={index} src={item} className="md:mt-6 sm:mt-4 mt-2 xl:w-36 xl:h-36 lg:w-28 lg:h-28 md:w-20 md:h-20 sm:w-16 sm:h-16 w-12 h-12" />
        )
      )}
    </div>
  )
}

export default Foods
