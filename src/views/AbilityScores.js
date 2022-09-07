import React, { useEffect, useState } from 'react'
import { checkFirstCheck } from '../components/Functions';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import '../display.css';
import useMainFetch from '../hooks/useMainFetch';

function AbilityScores() {

  const {
    object,
    array: abilityScoresList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/ability-scores");
  
  const [abilityScore, setAbilityScore] = useState({});
  const [loader, setLoader] = useState(true);
  const [subError, setSubError] = useState(null);

  async function scoreFetch(restURL) {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
      const result = await response.json();
      setAbilityScore(result);
      setLoader(false);
    } catch (error) {
      console.log("error", error)
      setSubError(error);
      setLoader(false);
    }
  }

  function setFirstCheck() {
    const allChecks = document.querySelectorAll("input");
    const firstCheck = document.querySelector("input");
    let isChecked = false;
    for (let i = 0; i < allChecks.length; i++) {
      if (allChecks[i].checked) {
        isChecked = true;
        break;
      }
    }
    if (!isChecked && firstCheck) {
      firstCheck.checked = true;
      scoreFetch(firstCheck.value);
    }
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
                              (e) => {
                                setLoader(true);
                                scoreFetch(item.url)
                              }
                            }/>
                          <label htmlFor={item.index}><div>{item.name}</div></label>
                      </div>
                  )
              })}
          </div>
          
          {loader && <p>loading...</p>}
          <div className='display'>
            {subError && <p>Something went wrong.. Please reload</p>}
            {!loader && 
              <>
                <h3>{abilityScore.name}</h3>
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
          </div>
        </>
        }
        {setFirstCheck()}
    </div>
  )
}

export default AbilityScores