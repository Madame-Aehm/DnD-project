import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

function Classes() {

    const [classList, setClassList] = useState([]);
    const fetchList = async() => {
      if (classList.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/classes");
          const result = await response.json();
          console.log(result);
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
        {classList.map((item, i) => {
          return (
            <a className='explore-button' href={item.index} key={item.index}>{item.name}</a>
          )
        })}
      </div>


    </div>
  )
}

export default Classes