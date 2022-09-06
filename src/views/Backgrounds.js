import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';

function Backgrounds() {

  const {
    controlList,
    mainList: bgList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/backgrounds");

  return (
    <div className='content-container'>
    <NavBar/>
    <h1>Backgrounds</h1>
    {error && <p>Something went wrong.. Please reload.</p>}
    {pageLoader && <Loader/>}
    {!pageLoader &&
      <>
        <div className='explore-list'>
              {bgList.map((item) => {
                return (
                  <Link className='explore-button' to={"/selectedbg"} state={{url: item.url, array: bgList}} key={item.index}>{item.name}</Link>
                )
              })}
          </div>
      </>
    }
    
</div>
  )
}

export default Backgrounds