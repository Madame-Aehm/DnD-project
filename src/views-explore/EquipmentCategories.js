import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import useMainFetch from '../hooks/useMainFetch';

function EquipmentCategories() {

  const {
    array,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/equipment-categories");

  const [filter, setFilter] = useState("");
  const filteredList = array.filter((item) => item.index.includes(filter));

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className='content-container'>
        <NavBar/>
        {error && <p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
          <>
            <h1>Equipment Categories</h1>
            <input className='textbox' type={"text"} placeholder={"Search"} onChange={handleFilterChange}></input>
            <div className='explore-list'>
              {filteredList.map((item) => {
                return (
                  <Link className='explore-button' to={"/selectedequipmentcategory"} state={{url: item.url, array: filteredList, searchResult: filter, category: "Equipment"}} key={item.index}>{item.name}</Link>
                )
              })}
              {filteredList.length === 0 && <p>No Results</p>}
            </div>
          </>
        }
    </div>
  )
}

export default EquipmentCategories