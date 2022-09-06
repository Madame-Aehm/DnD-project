import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function Equipment() {

  const [controlList, setcontrolList] = useState([])
  const [equipmentList, setEquipmentList] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState(null);

  const fetchList = async() => {
    try {
      const response = await fetch("https://www.dnd5eapi.co/api/equipment");
      const result = await response.json();
      setEquipmentList(result.results);
      setcontrolList(result.results);
      setTimeout(() => {
        setPageLoader(false);
      }, 1000);
    } catch (error) {
      console.log("error", error)
      setError(error);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  function filter(input) {
    const listClone = [...controlList];
    const inputValue = input.value.toLowerCase().trim();
    const newList = listClone.filter(item => item.index.includes(inputValue));
    setEquipmentList(newList);
  }
  
  function RemoveLoader() {
    setPageLoader(false);
  }

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Equipment</h1>
        {error && <>{RemoveLoader()}<p>Something went wrong.. Please reload.</p></>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
          <>
            <input className='textbox' type={"text"} placeholder={"Search"} onChange={(e) => filter(e.target)}></input>
            <div className='explore-list'>
              {equipmentList.map((item) => {
                return (
                  <Link className='explore-button' to={"/selectedequipment"} state={{url: item.url, array: equipmentList}} key={item.index}>{item.name}</Link>
                )
              })}
              {equipmentList.length === 0 && <p>No Results</p>}
            </div>
          </>
        }
    </div>
  )
}

export default Equipment