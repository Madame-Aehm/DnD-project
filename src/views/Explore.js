import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import DisplayNicely from '../components/DisplayNicely';
import removeHyphens from '../components/RemoveHyphens';

function Explore() {

  const [exploreList, setExploreList] = useState([]);
  const fetchExploreList = async() => {
    if (exploreList.length === 0) {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/");
        const result = await response.json();
        const convert = Object.entries(result).map(([key, value]) => ({"endpoint": key, "url": value}));
        console.log(convert);
        setExploreList(convert);
      } catch (error) {
        console.log("error", error)
      }
    }
  }

  useEffect(() => {
    fetchExploreList();
  }, []);

  const testArray = ["test1", "test2", "test3", "test4", "test5"];

  return (
    <div  className='content-container'>
      <NavBar />
      <div className='explore-list'>
        {exploreList.map((item, i) => {
        return (
          <a className='explore-button' href={removeHyphens(item.endpoint)} key={i}>{DisplayNicely(item.endpoint)}</a>
        )
      })}</div>

      {/* <div className='explore-list'>
        {testArray.map((item, i) => {
          return <a className='explore-button' href='*' key={i}>{DisplayNicely(item)}</a>
        })}
      </div> */}
    
      
      

      
    </div>
  )
}

export default Explore