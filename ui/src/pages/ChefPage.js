import React from 'react';
import ChefProfile from '../components/chefpageComponents/ChefProfile';
import ChefSections from '../components/chefpageComponents/ChefSections';
import ChefMenus from '../components/chefpageComponents/ChefMenus';
import ChefAbout from '../components/chefpageComponents/ChefAbout';
import ChefReviews from '../components/chefpageComponents/ChefReviews';

function ChefPage() {

    return (
        <div className="max-w-[75%] mx-auto px-8 py-4">
            <ChefProfile />
            <ChefSections>
                <ChefMenus title="Menus" />
                <ChefAbout title="About" />
                <ChefReviews title="Reviews" />
            </ChefSections>
        </div>
    );
}

export default ChefPage;
