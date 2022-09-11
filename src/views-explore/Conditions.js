import React, { useEffect, useState } from 'react'
import { checkFirstCheck } from '../components/Functions';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';
import useSubFetch from '../hooks/useSubFetch';

function Conditions() {

  const {
    object,
    array: conditionsList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/conditions");

  const [restURL, setRestURL] = useState("/api/conditions/blinded");
  const {
    selected: condition, 
    loader, 
    subError
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleCheckboxChange (url) {
    setRestURL(url);
}

  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Conditions</h1>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
        <>
          <div className='checkbox-container-3'>
            {conditionsList.map((item) => {
              return (
                <div key={item.index}>
                  <input type={"radio"} 
                    name={"conditions"} 
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
          
          {loader && <p>loading...</p>}
          {!loader &&
            <>
              <div className='display'>
                <h3>{condition.name}</h3>
                  {condition.desc.map((item, i) => {
                      return (
                          <p key={i}>{item}</p>
                      )
                  })}
              </div>
            </>
          }
        </>
      }

    </div>
  )
}

export default Conditions