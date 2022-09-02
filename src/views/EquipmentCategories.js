import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

function EquipmentCategories() {

    const [controlList, setcontrolList] = useState([])
    const [equipmentCategoriesList, setEquipmentCategoriesList] = useState([]);

    const fetchList = async() => {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/equipment-categories");
        const result = await response.json();
        setEquipmentCategoriesList(result.results);
        setcontrolList(result.results);
      } catch (error) {
        console.log("error", error)
      }
    }
  
    useEffect(() => {
      fetchList();
    }, []);

    function filter(input) {
        const listClone = [...controlList];
        const inputValue = input.value.toLowerCase().trim();
        const newList = listClone.filter(item => item.index.includes(inputValue));
        setEquipmentCategoriesList(newList);
      }

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Equipment Categories</h1>
        <input className='textbox' type={"text"} placeholder={"Search"} onChange={(e) => filter(e.target)}></input>
        <div className='explore-list'>
        {equipmentCategoriesList.map((item) => {
          return (
            <Link className='explore-button' to={"/selectedequipmentcategory"} state={{url: item.url, array: equipmentCategoriesList}} key={item.index}>{item.name}</Link>
          )
        })}
      </div>
    </div>
  )
}

export default EquipmentCategories