import React, { useState } from 'react'
import { checkFirstCheck } from '../components/Functions';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import '../display.css';
import useMainFetch from '../hooks/useMainFetch';
import useSubFetch from '../hooks/useSubFetch';

function AbilityScores() {

  const {
    array: abilityScoresList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/ability-scores");

  const [restURL, setRestURL] = useState("/api/ability-scores/cha");
  const {
    selected: abilityScore, 
    loader, 
    subError
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleCheckboxChange (url) {
    setRestURL(url);
}

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Ability Scores</h1>
        {error && <p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
        <>
          <div className='checkbox-container-1'>
              {abilityScoresList && abilityScoresList.map((item) => {
                  return (
                      <div key={item.index}>
                          <input type={"radio"} 
                            name={"ability-score"} 
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
          {loader && <p>loading...</p>}
          <div className='display'>
            {subError && <p>Something went wrong.. Please reload</p>}
            {!loader && 
              <>
                <h3>{abilityScore.name}</h3>
                {abilityScore.skills && 
                <>
                <h5>Skills:</h5>
                <div className='mini-h-list'>
                  {abilityScore.skills.length === 0 && <h6>No skills to show</h6>}
                  {abilityScore.skills.map((skill) => {
                    return <h6 key={skill.index}>{skill.name}</h6>
                  })}
                </div>
                <h5>Description:</h5>
                {abilityScore.desc.map((description, i) => {
                  return <p key={i}>{description}</p>
                })}
                </>
                }
              </>
            }
          </div>
        </>
        }
    </div>
  )
}

export default AbilityScores