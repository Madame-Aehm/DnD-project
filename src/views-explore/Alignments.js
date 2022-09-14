import React, { useEffect, useState } from 'react'
import { checkFirstCheck } from '../components/Functions';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import useMainFetch from '../hooks/useMainFetch';
import useSubFetch from '../hooks/useSubFetch';

function Alignments() {

  const {
    object,
    array: alignmentsList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/alignments");

  const [restURL, setRestURL] = useState("/api/alignments/chaotic-evil");
  const {
    selected: alignment, 
    loader, 
    subError
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleCheckboxChange (url) {
    setRestURL(url);
}

  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Alignments</h1>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
        <>
          <div className='checkbox-container-2'>
            {alignmentsList.map((item) => {
                return (
                  <div key={item.index}>
                      <input type={"radio"} 
                        name={"alignments"} 
                        value={item.url} id={item.index} 
                        onChange={
                          (e) => {handleCheckboxChange(item.url)}
                        }/>
                      <label className='checkLabel' htmlFor={item.index}><div className='stacked-checkbox'>{item.name}</div></label>
                  </div>
                )
            })}
          </div>
          {checkFirstCheck()}
          {subError && <p>Something went wrong.. Please reload</p>}
          {loader && <p>loading...</p>}
          <div className='display'>
            {!loader &&
              <>
                <h3>{alignment.name}</h3>
                <p>{alignment.desc}</p>
              </> 
            }
          </div>
        </>
      }

      
    </div>
  )
}

export default Alignments