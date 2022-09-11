import React, { useEffect, useState } from 'react'
import { checkFirstCheck } from '../components/Functions';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';
import useSubFetch from '../hooks/useSubFetch';

function DamageTypes() {

  const {
    object,
    array: damageTypesList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/damage-types");

  const [restURL, setRestURL] = useState("/api/damage-types/acid");
  const {
    selected: damageType, 
    loader, 
    subError
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleCheckboxChange (url) {
    setRestURL(url);
}

  return (
    <div className='content-container'>
        <NavBar/>
        {error &&<p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
          <>
            <h1>Damage Types</h1>
            <div className='checkbox-container-3'>
              {damageTypesList.map((item) => {
                  return (
                      <div key={item.index}>
                          <input type={"radio"} 
                            name={"damage-types"} 
                            value={item.url} id={item.index} 
                            onChange={
                              (e) => {handleCheckboxChange(item.url)}
                            }/>
                          <label htmlFor={item.index}><div>{item.name}</div></label>
                      </div>
                  )
              })}
            </div>
            {checkFirstCheck()}
            {subError && <p>Something went wrong.. Please reload</p>}
            {loader && <p>loading...</p>}
            {!loader && 
              <div className='display'>
                <h3>{damageType.name}</h3>
                {damageType.desc.map((item, i) => {
                  return (
                      <p key={i}>{item}</p>
                  )
                })}
              </div>
            }
          </>
        }

    </div>
  )
}

export default DamageTypes