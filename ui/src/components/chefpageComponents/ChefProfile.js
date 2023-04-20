import React from 'react';
import StarRating from './StarRating';

// TODO: chef should come from backend
const ChefProfile = ({ chef = {
    id: 1,
    name: 'Ally Doe',
    backgroundImage: 'https://media-private.canva.com/V5u_Y/MAEEylV5u_Y/1/s2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20230420%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230420T054831Z&X-Amz-Expires=54728&X-Amz-Signature=35754d95c49d0b81b9946c44ef2c0011237e9677f9588373482bcb5a6cbbb55c&X-Amz-SignedHeaders=host&response-expires=Thu%2C%2020%20Apr%202023%2021%3A00%3A39%20GMT',
    profileImage: 'https://media-private.canva.com/MADFs4Vp_BY/1/screen.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20230420%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230420T035004Z&X-Amz-Expires=62745&X-Amz-Signature=06ebeeaa9db6cc0378ba0fbc367131dc512c05620fa1b17fd2b6a978f809c934&X-Amz-SignedHeaders=host&response-expires=Thu%2C%2020%20Apr%202023%2021%3A15%3A49%20GMT',
    address: '123 Street, City, State, Country',
    rating: 4.5,
    distance: '3.2 km',
} }) => {
    return (
        <div className="bg-white p-8 mb-8 rounded-lg">
            <div
                className="bg-cover bg-center h-72 relative"
                style={{ backgroundImage: `url(${chef.backgroundImage})` }}
            >
                <img
                    src={chef.profileImage}
                    alt={chef.name}
                    className="w-48 h-48 object-cover rounded-full border-4 border-white absolute bottom-[-90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
            </div>
            <div className="mt-14">
                <h1 className="text-2xl font-bold">{chef.name}</h1>
                <p className="text-lg font-semibold opacity-80">
                    {chef.distance} away - {chef.address}
                </p>
                <div className="flex items-center mt-2">
                    <span className="text-lg font-semibold opacity-80">
                    <StarRating stars={chef.rating} />
                    </span>
                </div>
                <button className="mt-4 px-4 py-2 border-2 border-black rounded-lg bg-transparent text-black font-semibold hover:bg-black hover:text-white transition-colors duration-300">
                    Follow {chef.name}
                </button>
            </div>
        </div>
    );
};

export default ChefProfile;
