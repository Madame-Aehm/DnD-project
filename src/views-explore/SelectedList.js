import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';

function SelectedList() {

  const location = useLocation();

  const {
    url,
    title
  } = location.state;

  const {
    array,
    pageLoader,
    error,
  } = useMainFetch(`https://www.dnd5eapi.co${url}`);

  const [filter, setFilter] = useState("");
  const filteredList = array.filter((item) => item.name.toLowerCase().includes(filter));

  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  function subList() {
    if (title !== "Equipment Categories") {
      return "/selected"
    } else {
      return "/sub-list"
    }
  }

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>{title}</h1>
        {error && <p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
          <>
            <input className='textbox' type={"text"} placeholder={"Search"} value={filter} onChange={handleFilterChange}></input>
            <div className='explore-list'>
              {filteredList.map((item) => {
                return (
                  <Link className='explore-button' to={subList()} state={{url: item.url, array: filteredList, searchResult: filter, category: title}} key={item.index}>{item.name}</Link>
                )
              })}
              {filteredList.length === 0 && <p>No Results</p>}
            </div>
          </>
        }
    </div>
  )
}

export default SelectedList