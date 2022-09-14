import React, { useState } from 'react'
import { checkFirstCheck } from '../components/Functions';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';
import useSubFetch from '../hooks/useSubFetch';

function Skills() {

  const {
    object,
    array: skillsList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/skills");

  const [restURL, setRestURL] = useState("/api/skills/acrobatics");
  const {
    selected: skill, 
    loader, 
    subError
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleCheckboxChange (url) {
    setRestURL(url);
  }

  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Skills</h1>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
        <>
          <div className='checkbox-container-3'>
            {skillsList.map((item) => {
              return (
                <div key={item.index}>
                  <input type={"radio"} 
                      name={"skills"} 
                      value={item.url} id={item.index} 
                      onChange={
                      (e) => {handleCheckboxChange(item.url)}
                      }/>
                  <label className='checkLabel' htmlFor={item.index}><div>{item.name}</div></label>
                </div>
              )
            })}
          </div>
          {checkFirstCheck()}
          {subError && <p>Something went wrong.. Please reload</p>}
          {loader && <p>loading...</p>}
          {!loader &&
            <>
              <div className='display'>
                <h3>{skill.name}</h3>
                {skill.desc.map((item, i) => {
                  return <p key={i}>{item}</p>
                })}
              </div>
            </>
          }
        </>
        }
    </div>
  )
}

export default Skills