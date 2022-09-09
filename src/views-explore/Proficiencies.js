import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function Proficiencies() {

  const [controlList, setControlList] = useState([]);
  const [proficienciesList, setProficienciesList] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  const fetchList = async() => {
    if (proficienciesList.length === 0) {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/proficiencies");
        const result = await response.json();
        setProficienciesList(result.results);
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
    setProficienciesList(newList);
  }

  function RemoveLoader() {
    setPageLoader(false);
  }

  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Proficiencies</h1>
      {error && <>{RemoveLoader()}<p>Something went wrong.. Please reload.</p></>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
          <>
            <input className='textbox' type={"text"} placeholder={"Search"} onChange={(e) => filter(e.target)}></input>
            <div className='explore-list'>
              {proficienciesList.map((item) => {
                return (
                  <Link className='explore-button' to={"/selectedproficiency"} state={{url: item.url, array: proficienciesList}} key={item.index}>{item.name}</Link>
                )
              })}
              {proficienciesList.length === 0 && <p>No Results</p>}
            </div>
          </>
        }
    </div>
  )
}

export default Proficiencies