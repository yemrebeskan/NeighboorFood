import chefImg from '../components/homepageComponents/chef_img.jpeg';
import gencay from './teamphotos/gencay.jpg';
import emre from './teamphotos/emre.jpg';
import kagan from './teamphotos/kagan.jpg';
import hasan from './teamphotos/hasan.jpg';
import gozde from './teamphotos/gözde.jpg';
import tugce from './teamphotos/tuğçe.jpg';

const AboutUs = (props) => {
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
    <div>
      <p className="text-6xl  text-center text-teal-500 mb-16">Our Team</p>
      <div className="mb-10 justify-center grid md:grid-cols-3 grid-cols-2 gap-2 p-4 container max-w-7xl m-auto px-4">
        {developerTeams.map((developer, index) => {
          return (
            <div key={index} className="flex xl:flex-row flex-col xl:justify-start justify-center items-center border-2 py-10 sm:px-6 px-2 text-slate-100 hover:bg-teal-600 bg-teal-500 rounded-xl">
              <img
                src={developer.image}
                className="rounded-full sm:h-40 h-24 xl:mr-3 mb-3"
              ></img>
              <div className="flex flex-col xl:items-start items-center">
                <p className="font-bold sm:text-lg text-xs">{developer.name}</p>
                <p className='container font-light text-sm'>{developer.mail}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AboutUs;
