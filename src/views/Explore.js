import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { removeHyphens, displayNicely } from '../components/Functions';
import { Link } from "react-router-dom";
import Loader from '../components/Loader';

function Explore() {

  const [exploreList, setExploreList] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState(null);

  const fetchExploreList = async() => {
    try {
      const response = await fetch("https://www.dnd5eapi.co/api/");
      const result = await response.json();
      const convert = Object.entries(result).map(([key, value]) => ({"endpoint": key, "url": value}));
      setExploreList(convert);
      setTimeout(() => {
        setPageLoader(false);
      }, 1000);
    } catch (error) {
      console.log("error", error);
      setError(error);
      setPageLoader(false);
    }
  }

  useEffect(() => {
      fetchExploreList();
  }, []);


  return (
    <div className='content-container'>
      <NavBar />
      <h1>Explore</h1>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      <div className='explore-list'>
        {!pageLoader && exploreList.map((item, i) => {
          return (
            <Link className='explore-button' 
              to={'/' + removeHyphens(item.endpoint)} 
              state={{url: item.url, title: item.endpoint}} 
              key={i}>
                {displayNicely(item.endpoint)}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Explore