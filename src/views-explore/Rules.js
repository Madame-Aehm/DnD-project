import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import useMainFetch from '../hooks/useMainFetch';

function Rules() {

  const {
    array,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/rules");

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
            <h1>Rules</h1>
            <input className='textbox' type={"text"} placeholder={"Search"} onChange={handleFilterChange}></input>
            <div className='explore-list'>
              {filteredList.map((item) => {
                return (
                  <Link className='explore-button' to={"/selected-rule"} state={{url: item.url, array: filteredList, searchResult: filter, category: "Rules"}} key={item.index}>{item.name}</Link>
                )
              })}
              {filteredList.length === 0 && <p>No Results</p>}
            </div>
          </>
        }
    </div>
  )
}

export default Rules