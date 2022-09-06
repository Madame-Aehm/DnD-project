import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import '../display.css';

function AbilityScores() {

  const [abilityScoresList, setAbilityScoresList] = useState([]);
  const [loader, setloader] = useState(true);
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState(null);

  const fetchList = async() => {
    if (abilityScoresList.length === 0) {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/ability-scores");
        const result = await response.json();
        setAbilityScoresList(result.results);
        setTimeout(() => {
          setPageLoader(false);
        }, 1000);
      } catch (error) {
        console.log("error", error)
        setError(error);
      }
    }
  }

  async function scoreFetch(restURL) {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
      const result = await response.json();
      setabilityScoreName(result.full_name);
      setabilityScoreSkills(result.skills);
      setabilityScoreDescription(result.desc);
      setloader(false);
    } catch (error) {
      console.log("error", error)
      setError(error);
    }
  }

  const [abilityScoreName, setabilityScoreName] = useState("");
  const [abilityScoreSkills, setabilityScoreSkills] = useState([]);
  const [abilityScoreDescription, setabilityScoreDescription] = useState([]);
  const noSkill = <h6>No skills to show</h6>;
  
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
  
  useEffect(() => {
    fetchList();
  }, []);

  function RemoveLoader() {
    setPageLoader(false);
  } 

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Ability Scores</h1>
        {error && <>{RemoveLoader()} <p>Something went wrong.. Please reload.</p></>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
        <>
          <div className='checkbox-container-1'>
              {abilityScoresList.map((item) => {
                  return (
                      <div key={item.index}>
                          <input type={"radio"} 
                            name={"ability-score"} 
                            value={item.url} id={item.index} 
                            onChange={
                              (e) => {
                                setloader(true);
                                scoreFetch(item.url)
                              }
                            }/>
                          <label htmlFor={item.index}>{item.name}</label>
                      </div>
                  )
              })}
          </div>
          
          {loader && <p>loading...</p>}
          <div className='display'>
            {!loader && 
              <>
                <h3>{abilityScoreName}</h3>
                <h5>Skills:</h5>
                <div className='mini-h-list'>
                  {abilityScoreSkills.length === 0 && noSkill}
                  {abilityScoreSkills.map((skill) => {
                    return <h6 key={skill.index}>{skill.name}</h6>
                  })}
                </div>
                <h5>Description:</h5>
                {abilityScoreDescription.map((description, i) => {
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