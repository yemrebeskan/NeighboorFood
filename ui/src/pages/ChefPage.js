import React, { useContext, useEffect, useState } from 'react';
import ChefProfile from '../components/chefpageComponents/ChefProfile';
import SectionIndicator from '../components/chefpageComponents/SectionIndicator';
import LoadingSpinner from '../components/chefpageComponents/LoadingSpinner';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';


function makeChefObjectWithDbData(chef) {
  const { userInfos, ...rest } = chef;
  return {
    ...rest,
    name: userInfos.name + ' ' + userInfos.surname,
    totalVotes: chef.ratingCount,
    address: userInfos.district,
    backgroundImage: chef.thumbnail,
    profileImage: userInfos.image,
    email: userInfos.email,
  }
}

function ChefPage() {
  const isChef = true;

  const [chefData, setChefData] = useState(undefined);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const { id } = useParams();

  async function getChef() {
    setIsLoading(true);

    const res = await axios.get(`http://127.0.0.1:3001/api/v1/chefs/${id}`);
    if (res.status === 404 || res.status === 500) {
      return 'ERROR';
    }
    const chefData = res.data.data.chef.at(0);
    const menuRes = await axios.get(
      `http://127.0.0.1:3001/api/v1/chefs/${id}/menu`
    );
    if (menuRes.status === 404 || menuRes.status === 500) {
      return 'ERROR';
    }

    const reviewResp = await axios.get(
      `http://127.0.0.1:3001/api/v1/reviews/user/${chefData._id}`
    );
    if (reviewResp.status === 404 || reviewResp.status === 500) {
      return 'ERROR';
    }

    chefData.menu = menuRes.data.data.menu;
    chefData.reviews = reviewResp.data.data.reviews;

    return chefData;
  }
  useEffect(() => {
    getChef()
      .then((resp) => {
        if (typeof resp !== 'string')
          setChefData(makeChefObjectWithDbData(resp))
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  if (!isLoading && typeof chefData === "undefined") {
    return <ErrorPage message={'There is no chef found with that id.'} />
  }

  return (
    <div className={authCtx.isOnClickedSignButton ? 'blur-sm' : ''}>
      <div className="container max-w-[90rem] mx-auto lg:px-48 sm:px-24 px-4 py-8">
        {!isLoading ? (
          <>
            <ChefProfile isChef={isChef} chefInfo={chefData} />
            <SectionIndicator isChef={isChef} chefInfo={chefData} />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  )
}

export default ChefPage
