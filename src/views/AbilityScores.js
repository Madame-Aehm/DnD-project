import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import '../display.css';

function AbilityScores() {

    const [abilityScoresList, setAbilityScoresList] = useState([]);
    const fetchList = async() => {
      if (abilityScoresList.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/ability-scores");
          const result = await response.json();
          setAbilityScoresList(result.results);
        } catch (error) {
          console.log("error", error)
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
      } catch (error) {
        console.log("error", error)
      }
    }

    const [abilityScoreName, setabilityScoreName] = useState("");
    const [abilityScoreSkills, setabilityScoreSkills] = useState([]);
    const [abilityScoreDescription, setabilityScoreDescription] = useState([]);
    const noSkill = <h6>No skills to show</h6>;
    
    function setFirstCheck() {
      const firstCheck = document.querySelector("input");
      firstCheck.checked = true;
    }

    useEffect(() => {
      fetchList();
    }, []);


  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Ability Scores</h1>

        <div className='checkbox-container-1'>
            {abilityScoresList.map((item) => {
                return (
                    <div key={item.index}>
                        <input type={"radio"} 
                          name={"ability-score"} 
                          value={item.url} id={item.index} 
                          onChange={
                            (e) => scoreFetch(item.url)
                          }/>
                        <label htmlFor={item.index}>{item.name}</label>
                    </div>
                )
            })}
            
        </div>
        
        <div className='display'>
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
        </div>

    </div>
  )
}

export default AbilityScores