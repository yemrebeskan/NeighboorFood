import React from 'react';
import chefImg from '../components/homepageComponents/chef_img.jpeg';
import gencay from './teamphotos/gencay.jpg';
import emre from './teamphotos/emre.jpg';
import kagan from './teamphotos/kagan.jpg';
import hasan from './teamphotos/hasan.jpg';
import gozde from './teamphotos/gözde.jpg';
import tugce from './teamphotos/tuğçe.jpg';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

const AboutUs = (props) => {
  const authCtx = useContext(AuthContext);
  const developerTeams = [
    {
      id: '1',
      name: 'Yusuf Emre Beskan',
      image: emre,
      mail: 'emre@shanzee.com',
    },
    {
      id: '2',
      name: 'Gencay Turgut',
      image: gencay,
      mail: 'gencay@shanzee.com',
    },
    {
      id: '3',
      name: 'Mustafa Kağan Yalım',
      image: kagan,
      mail: 'kagan@shanzee.com',
    },
    {
      id: '4',
      name: 'Hasan Semih Selçuk',
      image: hasan,
      mail: 'hasan@shanzee.com',
    },
    {
      id: '5',
      name: 'Gözde Kurtulmuş',
      image: gozde,
      mail: 'gözde@gmail.com',
    },
    {
      id: '6',
      name: 'Tuğçe Türkmenler',
      image: tugce,
      mail: 'tugce0026@hotmail.com',
    },
  ];

  return (
    <div className={authCtx.isOnClickedSignButton ? 'blur-sm bg-white mb-10' : 'bg-white mb-10' }>
      <div className="container mx-auto px-4 py-8">
        <h3 className="text-2xl text-center text-teal-500 mb-6">About NeighborFood</h3>
        <p className="text-gray-800 text-lg mb-4">
          NeighborFood is a company dedicated to delivering quality and healthy food to your doorstep. We believe in providing convenient and nutritious meal options for busy individuals and families.
        </p>
        <p className="text-gray-800 text-lg mb-4">
          Our team of talented chefs and nutritionists work together to create delicious and balanced meals that cater to various dietary preferences and requirements. We source fresh, locally-sourced ingredients to ensure the highest quality in every dish we deliver.
        </p>
        <p className="text-gray-800 text-lg mb-4">
          At NeighborFood, we are passionate about promoting healthy eating habits and making it easy for our customers to enjoy nutritious meals without compromising on taste or convenience. We strive to be your trusted partner in achieving your health and wellness goals.
        </p>
      </div>
      <p className="text-6xl text-center text-teal-500 my-16">Our Team</p>
      <div className="grid grid-cols-3 gap-4 container mx-auto">
        {developerTeams.map((developer, index) => {
          return (
            <div key={index} className="flex flex-col items-center border-2 py-8 px-6 text-center bg-teal-500 text-white rounded-xl">
              <img
                src={developer.image}
                className="w-40 h-40 rounded-full mb-4"
                alt={developer.name}
              />
              <div>
                <p className="font-bold text-xl mb-2">{developer.name}</p>
                <p className="text-sm">{developer.mail}</p>
              </div>
            </div>
          )
        })}
      </div>
 
    </div>
  );
};

export default AboutUs;
