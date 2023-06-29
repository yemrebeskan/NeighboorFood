import { Link } from 'react-router-dom'
import chefImg from './chef_img.jpeg'
const CardItem = () => {
  return (
    <div className="sm:w-96 w-72 border-solid border-2 border-teal-700 p-4 grid">
      <img src={chefImg} className="mb-4 place-self-center"></img>
      <p className='sm:text-[16px] text-[10px]'>
        The day had begun on a bright note. The sun finally peeked through the
        rain for the first time in a week, and the birds were sinf=ging in its
        warmth. There was no way to anticipate what was about to happen. It was
        a worst-case scenario and there was no way out of it.
      </p>
      <Link to="/bechef">
        <button className="sm:text-[16px] text-[12px] border-solid border-2 border-slate-400 mt-4 mb-4 bg-teal-500 mr-4 rounded-lg sm:p-3 p-1 w-28 text-slate-50 hover:bg-teal-700 place-self-center">
          Be Chef
        </button>
      </Link>
    </div>
  )
}

export default CardItem
