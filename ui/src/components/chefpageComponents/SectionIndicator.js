// components/SectionIndicator.js
import React, { useState } from 'react'
import ChefMenus from './ChefMenus'
import ChefAbout from './ChefAbout'
import ChefReviews from './ChefReviews'

function SectionIndicator({ isChef }) {
  //This should come from backend
  const aboutText =
    'Hello, my name is Ally and I am a home chef in my 60s.\nCooking has been my passion for as long as I can remember and I have spent countless hours experimenting with different ingredients and techniques to create delicious and wholesome meals.\nOver the years, I have honed my skills and developed a keen sense of taste and presentation, which I bring to every dish I create.'

  const [selectedSection, setSelectedSection] = useState('Menus')

  const sections = ['Menus', 'About', 'Reviews']

  const handleClick = (section) => {
    setSelectedSection(section)
  }

  const renderSelectedSection = () => {
    switch (selectedSection) {
      case 'Menus':
        return <ChefMenus isChef={isChef} />
      case 'About':
        //TODO: this should come from backend
        return (
          <ChefAbout
            isChef={isChef}
            about={aboutText}
            phone="123-456-7890"
            email="chef@example.com"
          />
        )
        case 'Reviews':
          return <ChefReviews isChef={isChef} />;
      default:
        return null
    }
  }

  return (
    <div>
      <div className="flex justify-center space-x-48 border-b border-gray-300 mb-4">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => handleClick(section)}
            className={`${
              section === selectedSection
                ? 'bg-green-700  text-black px-12 py-4 rounded-md'
                : 'bg-transparent px-12 py-4'
            }  font-semibold hover:bg-green-700 hover:rounded-md hover:opacity-32 text-lg bg-opacity-30`}
          >
            {section}
          </button>
        ))}
      </div>
      <div className="flex justify-center">{renderSelectedSection()}</div>
    </div>
  )
}

export default SectionIndicator