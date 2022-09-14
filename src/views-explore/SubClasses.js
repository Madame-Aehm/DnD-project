import React from 'react'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';

function SubClasses() {

  const {
    object,
    array: classList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/subclasses");

  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Subclasses</h1>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
        <>
          <div className='explore-list'>
            {classList.map((item) => {
              return (
                <Link className='explore-button' to={"/selectedclass"} state={{url: item.url, array: classList, searchResult: "", category: "Classes"}} key={item.index}>{item.name}</Link>
              )
            })}
          </div>
        </>
      }
    </div>
  )
}

export default SubClasses