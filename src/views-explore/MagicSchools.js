import React, { useEffect, useState } from 'react'
import { checkFirstCheck } from '../components/Functions';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';
import useSubFetch from '../hooks/useSubFetch';

function MagicSchools() {

  const {
    object,
    array: magicSchoolsList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/magic-schools");

  const [restURL, setRestURL] = useState("/api/magic-schools/abjuration");
  const {
    selected: magicSchool, 
    loader, 
    subError
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleCheckboxChange (url) {
    setRestURL(url);
  }

  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Magic Schools</h1>
      {error &&  <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
        <>
          <div className='checkbox-container-3'>
            {magicSchoolsList.map((item) => {
                return (
                  <div key={item.index}>
                      <input type={"radio"} 
                        name={"magicschools"} 
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
          <div className='display'>
            {subError && <p>Something went wrong.. Please reload</p>}
            {!loader &&
              <>
                <h3>{magicSchool.name}</h3>
                <p>{magicSchool.desc}</p>
              </> 
            }
          </div>
        </>
      }
    </div>
  )
}

export default MagicSchools