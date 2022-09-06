import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { Link } from "react-router-dom";
import Loader from '../components/Loader';
import useMainFetch from '../hooks/useMainFetch';

function Classes() {

  const {
    controlList,
    mainList: classList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/classes");

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Classes</h1>
        {error && <p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
          <>
            <div className='explore-list'>
              {classList.map((item) => {
                return (
                  <Link className='explore-button' to={"/selectedclass"} state={{url: item.url, array: classList}} key={item.index}>{item.name}</Link>
                )
              })}
            </div>
          </>
        }
        
    </div>
  )
}

export default Classes