import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

function Backgrounds() {

    const [bgList, setBgList] = useState([]);
    const fetchList = async() => {
      if (bgList.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/backgrounds");
          const result = await response.json();
          setBgList(result.results);
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
    <h1>Backgrounds</h1>
    <div className='explore-list'>
      {bgList.map((item) => {
        return (
          <Link className='explore-button' to={"/selectedbg"} state={item.url} key={item.index}>{item.name}</Link>
        )
      })}
  </div>
</div>
  )
}

export default Backgrounds