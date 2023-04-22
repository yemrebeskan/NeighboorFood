import React from 'react'
import ChefProfile from '../components/chefpageComponents/ChefProfile'
import SectionIndicator from '../components/chefpageComponents/SectionIndicator'

function ChefPage({ isOnClickedSignButton }) {
  return (
    <div className={isOnClickedSignButton ? 'blur-sm' : ''}>
      <div className="max-w-[75%] mx-auto px-8 py-4">
        <ChefProfile />
        <SectionIndicator />
      </div>
    </div>
  )
}

export default ChefPage
