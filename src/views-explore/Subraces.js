import React from 'react'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';

function Subraces() {

  const {
    object,
    array: racesList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/subraces");

  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Subraces</h1>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
        <>
          <div className='explore-list'>
            {racesList.map((item) => {
              return (
                <Link className='explore-button' to={"/selectedrace"} state={{url: item.url, array: racesList}} key={item.index}>{item.name}</Link>
              )
            })}
          </div>
        </>
      }
      

    </div>
  )
}

export default Subraces