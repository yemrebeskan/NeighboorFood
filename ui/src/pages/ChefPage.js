import React, { useContext } from 'react'
import ChefProfile from '../components/chefpageComponents/ChefProfile'
import SectionIndicator from '../components/chefpageComponents/SectionIndicator'
import AuthContext from '../context/AuthContext'

function ChefPage() {
  const isChef = true;

  const authCtx = useContext(AuthContext)
  return (
    <div className={authCtx.isOnClickedSignButton ? 'blur-sm' : ''}>
      <div className="max-w-[75%] mx-auto px-8 py-4">
        <ChefProfile isChef={isChef} />
        <SectionIndicator isChef={isChef}/>
      </div>
    </div>
  )
}

export default ChefPage
