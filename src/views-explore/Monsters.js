import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function Monsters() {

  const [controlList, setControlList] = useState([]);
  const [monstersList, setMonstersList] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState(null);

  const fetchList = async() => {
    if (monstersList.length === 0) {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/monsters");
        const result = await response.json();
        setMonstersList(result.results);
        setControlList(result.results);
        console.log(result);
        setTimeout(() => {
          setPageLoader(false);
        }, 1000);
      } catch (error) {
        console.log("error", error)
        setError(error);
      }
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  function filter(input) {
    const listClone = [...controlList];
    const inputValue = input.value.toLowerCase().trim();
    const newList = listClone.filter(item => item.index.includes(inputValue));
    setMonstersList(newList);
  }

  function RemoveLoader() {
    setPageLoader(false);
  }

  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Monsters</h1>
      {error && <>{RemoveLoader()}<p>Something went wrong.. Please reload.</p></>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
          <>
            <input className='textbox' type={"text"} placeholder={"Search"} onChange={(e) => filter(e.target)}></input>
            <div className='explore-list'>
              {monstersList.map((item) => {
                return (
                  <Link className='explore-button' to={"/selectedmonster"} state={{url: item.url, array: monstersList}} key={item.index}>{item.name}</Link>
                )
              })}
              {monstersList.length === 0 && <p>No Results</p>}
            </div>
          </>
        }
    </div>
  )
}

export default Monsters