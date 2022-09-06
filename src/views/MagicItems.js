import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function MagicItems() {

  const [controlList, setcontrolList] = useState([])
  const [magicItemsList, setMagicItemsList] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState(null);

  const fetchList = async() => {
    try {
      const response = await fetch("https://www.dnd5eapi.co/api/magic-items");
      const result = await response.json();
      setMagicItemsList(result.results);
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
    setMagicItemsList(newList);
  }

  function RemoveLoader() {
    setPageLoader(false);
  }

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Magic Items</h1>
        {error && <>{RemoveLoader()}<p>Something went wrong.. Please reload.</p></>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
          <>
            <input className='textbox' type={"text"} placeholder={"Search"} onChange={(e) => filter(e.target)}></input>
            <div className='explore-list'>
              {magicItemsList.map((item) => {
                return (
                  <Link className='explore-button' to={"/selectedequipment"} state={{url: item.url, array: magicItemsList}} key={item.index}>{item.name}</Link>
                )
              })}
              {magicItemsList.length === 0 && <p>No Results</p>}
            </div>
          </>
        }
    </div>
  )
}

export default MagicItems