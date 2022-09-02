import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar'

function Equipment() {

    const [equipmentList, setEquipmentList] = useState([]);
    const fetchList = async() => {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/equipment");
        const result = await response.json();
        console.log(result);
        setEquipmentList(result.results);
      } catch (error) {
        console.log("error", error)
      }
    }
  
    useEffect(() => {
      fetchList();
    }, []);

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Equipment</h1>
        <div className='explore-list'>
        {equipmentList.map((item, i) => {
          return (
            <Link className='explore-button' to={"/selectedequipment"} state={item.url} key={item.index}>{item.name}</Link>
          )
        })}
      </div>
        
    </div>
  )
}

export default Equipment