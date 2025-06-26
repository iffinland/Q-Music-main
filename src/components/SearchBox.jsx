// src/components/SearchBox.jsx
import React, { useState } from 'react';

// Eeldame, et 'placeholderText' ja 'onActualSearch' tulevad propsidena
function SearchBox({ onActualSearch, placeholderText = "Otsi laule, playliste..." }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    // Võiksime siin ka reaalajas otsingut teha (debounced), aga praegu mitte
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() && typeof onActualSearch === 'function') {
      onActualSearch(searchTerm.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form"> {/* Lisa klassinimi stiilimiseks */}
      <input
        type="search"
        placeholder={placeholderText}
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input" // Lisa klassinimi stiilimiseks
      />
      <button type="submit" className="search-button"> {/* Lisa klassinimi stiilimiseks */}
        Otsi
      </button>
    </form>
  );
}

export default SearchBox;