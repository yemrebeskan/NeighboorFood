import React, { useState } from 'react';
import './SearchBar.css';
const cities = [
  'adana',
  'adiyaman',
  'afyonkarahisar',
  'agri',
  'aksaray',
  'amasya',
  'ankara',
  'antalya',
  'ardahan',
  'artvin',
  'aydin',
  'balikesir',
  'bartin',
  'batman',
  'bayburt',
  'bilecik',
  'bingol',
  'bitlis',
  'bolu',
  'burdur',
  'bursa',
  'canakkale',
  'cankiri',
  'corum',
  'denizli',
  'diyarbakir',
  'duzce',
  'edirne',
  'elazig',
  'erzincan',
  'erzurum',
  'eskisehir',
  'gaziantep',
  'giresun',
  'gumushane',
  'hakkari',
  'hatay',
  'igdir',
  'isparta',
  'istanbul',
  'izmir',
  'kahramanmaras',
  'karabuk',
  'karaman',
  'kars',
  'kastamonu',
  'kayseri',
  'kilis',
  'kirikkale',
  'kirklareli',
  'kirsehir',
  'kocaeli',
  'konya',
  'kutahya',
  'malatya',
  'manisa',
  'mardin',
  'mersin',
  'mugla',
  'mus',
  'nevsehir',
  'nigde',
  'ordu',
  'osmaniye',
  'rize',
  'sakarya',
  'samsun',
  'sanliurfa',
  'siirt',
  'sinop',
  'sivas',
  'tekirdag',
  'tokat',
  'trabzon',
  'tunceli',
  'usak',
  'van',
  'yalova',
  'yozgat',
  'zonguldak'
];

const SearchBar = (props) => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSearch(location.toLowerCase());
  };

  const handleLocationChange = (event) => {
    const value = event.target.value.toLowerCase();
    setLocation(value);
  
    const filteredSuggestions = value ? cities.filter((city) => city.startsWith(value)) : [];
    setSuggestions(filteredSuggestions);
  };
  

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setSuggestions([]);
    props.onSearch(suggestion.toLowerCase());
  };
  

  return (
    <form
    className="border-solid border-2 border-slate-400 rounded-lg flex items-center max-w-[607px] mx-auto w-full py-2"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Search your best chefs..."
        className="w-full sm:h-12 h-8 mr-4 ml-2 rounded-lg border-slate-400 border-2 p-2 sm:text-[16px] text-[10px]"
        value={location}
        onChange={handleLocationChange}
      />
      <button
        className="border-solid border-2 border-slate-400 bg-teal-500 mr-2 rounded-lg sm:p-4 p-2 sm:text-[16px] text-[12px] w-40 text-slate-50 hover:bg-teal-700"
        type="submit"
      >
        Search
      </button>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className="suggestion"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;