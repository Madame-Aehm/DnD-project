import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { Link } from "react-router-dom";

function Classes() {

    const [classList, setClassList] = useState([]);
    const fetchList = async() => {
      if (classList.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/classes");
          const result = await response.json();
          setClassList(result.results);
        } catch (error) {
          console.log("error", error)
        }
      }
    }

    useEffect(() => {
        fetchList();
      }, []);

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Classes</h1>
        <div className='explore-list'>
          {classList.map((item) => {
            return (
              <Link className='explore-button' to={"/selectedclass"} state={{url: item.url, array: classList}} key={item.index}>{item.name}</Link>
            )
          })}
      </div>
    </div>
  )
}

export default Classes