import React, { useState } from 'react'
import './SearchBar.css'
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
    className="border-solid border-2 border-slate-400 rounded-lg flex form"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Search your best chefs..."
        className="w-96 h-12 mr-4 mt-5 ml-2 rounded-lg border-slate-400 border-2 input_bar p-2"
        value={location}
        onChange={handleLocationChange}
      ></input>
      <button
        className="border-solid border-2 border-slate-400 mt-4 mb-4 bg-teal-500 mr-4 rounded-lg p-4 w-40 text-slate-50 hover:bg-teal-700"
        type="submit"
      >
        <p className="ml-2 mr-2"> Search </p>
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