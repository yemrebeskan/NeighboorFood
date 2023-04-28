import Foods from '../components/homepageComponents/foods'
import SearchBar from '../components/homepageComponents/SearchBar'
import img from './photo4.png'
import CardItem from '../components/homepageComponents/CardItem'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'

const HomePage = () => {
  const authCtx = useContext(AuthContext)
  return (
    <div className={authCtx.isOnClickedSignButton ? 'blur-sm' : ''}>
      <div className="py-36 flex">
        <div className="ml-32 -mt-20 justify-self-start">
          <SearchBar></SearchBar>
        </div>

        <img src={img} className="-mt-32 ml-64 rounded-lg -mt-52"></img>
      </div>

      <div className=" bg-teal-500 flex justify-center">
        <div className="">
          <Foods></Foods>
        </div>
        <div className=" bg-orange-100 rounded-full px-36 py-36 absolute mt-48"></div>
      </div>
      <div className="py-44 bg-orange-100 flex">
        <div className="ml-32">
          <CardItem></CardItem>
        </div>
        <div>
          <h1 className="ml-80 text-3xl italic text-teal-700">
            KOMŞUDA PİŞER BİZE DE DÜŞER
          </h1>
        </div>
      </div>
    </div>
  )
}

export default HomePage
