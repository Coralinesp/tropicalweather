import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Llama a la función de búsqueda en Home.jsx
  };

  return (
    <div className='busqueda'>
      <input
        className='barrabusqueda'
        type="text"
        placeholder="Buscar provincia..."
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
