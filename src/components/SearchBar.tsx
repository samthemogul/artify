// import React from 'react'
import { IoSearch } from "react-icons/io5";

import '../styles/searchbar.css'

const SearchBar = () => {
  return (
    <div className='searchbar'>
      <input className='searchinput' type="text" placeholder="Search for an Art..."
      />
      <button title='search' className='searchbutton'><IoSearch className='searchicon'/></button>
    </div>
  )
}

export default SearchBar