import React, { useContext, useEffect, useState } from 'react'
import ChefProfile from '../components/chefpageComponents/ChefProfile'
import SectionIndicator from '../components/chefpageComponents/SectionIndicator'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const dummyChef = {
  // This chef is for 1 id.
  id: 1,
  name: 'Marry Jane',
  backgroundImage:
    'https://thumbs.dreamstime.com/b/fresh-food-ingredients-vegetarian-kitchen-wooden-background-top-view-raw-vegetable-143531625.jpg',
  profileImage:
    'https://www.gravatar.com/avatar/993455f0ba0ccbcfcf99819b4292c744',
  address: '123 Street, City, State, Country',
  rating: 4.5,
  totalVotes: 100,
  distance: '3.2 km',
  about:
    'Hello, my name is Marry and I am a home chef in my 60s.\nCooking has been my passion for as long as I can remember and I have spent countless hours experimenting with different ingredients and techniques to create delicious and wholesome meals.\nOver the years, I have honed my skills and developed a keen sense of taste and presentation, which I bring to every dish I create.',
  phone: '123-456-7890',
  email: 'chef@example.com',
}

function makeChefObjectWithDbData(chef) {
  const { userInfos, ...rest } = chef
  return {
    ...rest,
    name: userInfos.name + ' ' + userInfos.surname,
    totalVotes: chef.ratingCount,
    distance: 'XXX km', //Should be computed
    address: userInfos.district,
    backgroundImage: chef.thumbnail,
    profileImage: userInfos.image,
    email: userInfos.email,
  }
}

function ChefPage() {
  const isChef = true

  const [chefData, setChefData] = useState(dummyChef)
  const [isLoading, setIsLoading] = useState(false)
  const authCtx = useContext(AuthContext)
  const { id } = useParams()
  async function getChef() {
    setIsLoading(true)
    const res = await axios.get(`http://127.0.0.1:3001/api/v1/chefs/${id}`)
    if (res.status === 404 || res.status === 500) {
      return 'ERROR'
    }
    const chefData = res.data.data.chef.at(0)

    const menuRes = await axios.get(
      `http://127.0.0.1:3001/api/v1/chefs/${id}/menu`
    )
    if (menuRes.status === 404 || menuRes.status === 500) {
      return 'ERROR'
    }

    const reviewResp = await axios.get(
      `http://127.0.0.1:3001/api/v1/reviews/user/${chefData._id}`
    )
    if (reviewResp.status === 404 || reviewResp.status === 500) {
      return 'ERROR'
    }

    chefData.menu = menuRes.data.data.menu
    chefData.reviews = reviewResp.data.data.reviews
    return chefData
  }
  useEffect(() => {
    getChef()
      .then((resp) => {
        if (typeof resp !== 'string')
          setChefData(makeChefObjectWithDbData(resp))
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className={authCtx.isOnClickedSignButton ? 'blur-sm' : ''}>
      <div className="max-w-[75%] mx-auto px-8 py-4">
        {!isLoading ? (
          <>
            <ChefProfile isChef={isChef} chefInfo={chefData} />
            <SectionIndicator isChef={isChef} chefInfo={chefData} />
          </>
        ) : (
          <p>Loading....</p> // This loading UI should be changed.
        )}
      </div>
    </div>
  )
}

export default ChefPage
