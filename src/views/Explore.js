import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { removeHyphens, displayNicely } from '../components/DisplayNicely';
import { Link } from "react-router-dom";

function Explore() {

  const [exploreList, setExploreList] = useState([]);
  const fetchExploreList = async() => {
    try {
      const response = await fetch("https://www.dnd5eapi.co/api/");
      const result = await response.json();
      const convert = Object.entries(result).map(([key, value]) => ({"endpoint": key, "url": value}));
      setExploreList(convert);
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchExploreList();
  }, []);


  return (
    <div  className='content-container'>
      <NavBar />
      <h1>Explore</h1>
      <div className='explore-list'>
        {exploreList.map((item, i) => {
          return (
            <Link className='explore-button' to={'/' + removeHyphens(item.endpoint)} key={i}>{displayNicely(item.endpoint)}</Link>
          )
        })}
      </div>
    </div>
  )
}

export default Explore