// components/SectionIndicator.js
import React, { useState } from 'react';
import ChefMenus from './ChefMenus';
import ChefAbout from './ChefAbout';
import ChefReviews from './ChefReviews';

function SectionIndicator() {
  const [selectedSection, setSelectedSection] = useState('Menus');

  const sections = ['Menus', 'About', 'Reviews'];

  const handleClick = (section) => {
    setSelectedSection(section);
  };

  const renderSelectedSection = () => {
    switch (selectedSection) {
      case 'Menus':
        return <ChefMenus />;
      case 'About':
        return <ChefAbout />;
      case 'Reviews':
        return <ChefReviews />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-center space-x-48 border-b border-gray-300 mb-4">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => handleClick(section)}
            className={`${
              section === selectedSection ? 'bg-green-800  text-black px-12 py-4 rounded-md' : 'bg-transparent px-12 py-4' 
            }  font-semibold text-lg bg-opacity-30`}
          >
            {section}
          </button>
        ))}
      </div>
      <div className="flex justify-center">{renderSelectedSection()}</div>
    </div>
  );
}

export default SectionIndicator;
