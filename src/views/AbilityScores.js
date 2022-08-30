import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';

function AbilityScores() {

    const [abilityScoresList, setAbilityScoresList] = useState([]);
    const fetchList = async() => {
      if (abilityScoresList.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/ability-scores");
          const result = await response.json();
          setAbilityScoresList(result.results);
          console.log(result.results);
        } catch (error) {
          console.log("error", error)
        }
      }
    }

    useEffect(() => {
        fetchList();
      }, []);

  return (
    <div className='content-container'>
        <NavBar/>
        <div className='explore-list'>
            {abilityScoresList.map((item, i) => {
                return (
                <a className='explore-button' href={item.name} key={i}>{item.name}</a>
                )
            })}
        </div>

    </div>
  )
}

export default AbilityScores