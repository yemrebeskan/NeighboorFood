import chefImg from '../components/homepageComponents/chef_img.jpeg'
import gencay from './teamphotos/gencay.jpg'
import emre from './teamphotos/emre.jpg'
import kagan from './teamphotos/kagan.jpg'
import hasan from './teamphotos/hasan.jpg'
import unknown from './teamphotos/unknown.jpg'
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
      name: 'Kagan Yalım',
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
      image: unknown,
      mail: 'gözde@gmail.com',
    },
    {
      id: '6',
      name: 'Tuğçe Türkmenler',
      image: unknown,
      mail: 'tugce@gmail.com',
    },
  ]
  return (
    <div>
      <p className="text-6xl  text-center text-teal-500">Our Team</p>
      <div className="flex mb-60 justify-center grid grid-cols-3 ml-20 p-4 ">
        {developerTeams.map((developer) => {
          return (
            <div className="border-2 mr-12 mt-12 bg-teal-500 flex mr-4 text-slate-100 h-72 hover:bg-teal-600">
              <img
                src={developer.image}
                className="rounded-full ml-6 h-60 mt-8"
              ></img>
              <div className="mt-32 ml-12">
                <p>{developer.name}</p>
                <p>{developer.mail}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AboutUs
