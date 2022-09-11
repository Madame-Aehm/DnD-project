import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';

function Monsters() {

  const {
    object,
    array,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/monsters");

  const [filter, setFilter] = useState("");
  const filteredList = array.filter((item) => item.index.includes(filter));

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Monsters</h1>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
          <>
            <input className='textbox' type={"text"} placeholder={"Search"} value={filter} onChange={handleFilterChange}></input>
            <div className='explore-list'>
              {filteredList.map((item) => {
                return (
                  <Link className='explore-button' to={"/selectedmonster"} state={{url: item.url, array: filteredList, searchResult: filter}} key={item.index}>{item.name}</Link>
                )
              })}
              {filteredList.length === 0 && <p>No Results</p>}
            </div>
          </>
        }
    </div>
  )
}

export default Monsters