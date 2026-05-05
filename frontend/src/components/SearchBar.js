import React from 'react';
import search_img from '../Images/Search_img.png'

function SearchBar() {
  return (
    <div className="search_bar">
      <div className="search_img">
        <img src={search_img} alt="search_image" />
      </div>
      <input type="text" placeholder="Quick Search" id="quick_search" />
    </div>
  );
}

export default SearchBar;
