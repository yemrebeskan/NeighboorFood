import React, { useState } from 'react';

const ChefSections = ({ children }) => {
    const [activeSection, setActiveSection] = useState(0);

    const handleClick = (index) => {
        setActiveSection(index);
    };

    return (
        <div className="bg-white p-4 mb-4 rounded-lg">
            <div className="flex justify-center gap-4 mb-8">
                {React.Children.map(children, (child, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 font-semibold rounded-lg ${activeSection === index ? 'bg-gray-200' : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        {child.props.title}
                    </button>
                ))}
            </div>
            <div className='flex flex-col'>
                {children[activeSection]}
            </div>
        </div>
    );
};

export default ChefSections;
