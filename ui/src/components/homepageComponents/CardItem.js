import chefImg from './chef_img.jpeg'
const CardItem = () => {
  return (
    <div className="w-96 ml-20 -mt-24 border-solid border-2 border-teal-700 p-4 grid">
      <img src={chefImg} className="mb-4 place-self-center"></img>
      <p>
        The day had begun on a bright note. The sun finally peeked through the
        rain for the first time in a week, and the birds were sinf=ging in its
        warmth. There was no way to anticipate what was about to happen. It was
        a worst-case scenario and there was no way out of it.
      </p>
      <button className="border-solid border-2 border-slate-400 mt-4 mb-4 bg-teal-500 mr-4 rounded-lg p-3 w-28 text-slate-50 hover:bg-teal-700 place-self-center">
        Be Chef
      </button>
    </div>
  )
}

export default CardItem
