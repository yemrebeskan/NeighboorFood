import React, { useState } from 'react';
import ChefMenus from './ChefMenus';
import ChefAbout from './ChefAbout';
import ChefReviews from './ChefReviews';

function makeMenuObjectWithDbData(chefMenu) {
  const menu = chefMenu.foods.map((food) => {
    return {
      ...food,
      _id: food._id,
    }
  });
  return menu;
}

function SectionIndicator({ isChef, chefInfo }) {
  //This should come from backend
  const aboutText = chefInfo.about;
  const phone = chefInfo.phone ? chefInfo.phone : 'XXX-XXX-XX-XX';
  const email = chefInfo.email;
  const chefMenu = chefInfo.menu
    ? makeMenuObjectWithDbData(chefInfo.menu)
    : undefined;
  const chefReviews = chefInfo.reviews ? chefInfo.reviews : undefined;
  const [selectedSection, setSelectedSection] = useState('Menus');
  const sections = ['Menus', 'About', 'Reviews'];

  const handleClick = (section) => {
    setSelectedSection(section);
  }

  const renderSelectedSection = () => {
    switch (selectedSection) {
      case 'Menus':
        return <ChefMenus isChef={isChef} chefMenu={chefMenu} />;
      case 'About':
        //TODO: this should come from backend
        return (
          <ChefAbout
            isChef={isChef}
            about={aboutText}
            phone={phone}
            email={email}
          />
        );
      case 'Reviews':
        console.log(chefReviews);
        return (
          <ChefReviews
            isChef={isChef}
            reviews={
              chefReviews
                ? chefReviews.map((review) => {
                    return {
                      ...review,
                      reviewer: review.user,
                    }
                  })
                : undefined
            }
          />
        );
      default:
        return null;
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-12 border-b border-gray-300 mb-4">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => handleClick(section)}
            className={`${
              section === selectedSection
                ? 'bg-green-700  text-black px-4 sm:px-12 py-4 rounded-md'
                : 'bg-transparent px-4 sm:px-12 py-4'
            }  font-semibold hover:bg-green-700 hover:rounded-md hover:opacity-32 sm:text-lg text-md bg-opacity-30`}
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
