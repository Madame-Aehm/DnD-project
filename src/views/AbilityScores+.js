import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import '../abilityscores.css';

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

    function showMore() {
        const infosDiv = document.getElementById("infos");
        const textButton = document.getElementById("test-button");
        if (infosDiv.style.display === "block") {
            infosDiv.style.display = "none";
            textButton.style.borderRadius = "12px";
        } else {
            infosDiv.style.display = "block";
            textButton.style.borderTopLeftRadius = "12px";
            textButton.style.borderTopRightRadius = "12px";
            textButton.style.borderBottomLeftRadius = "0px";
            textButton.style.borderBottomRightRadius = "0px";
        }
    }

  return (
    <div className='content-container'>
        <NavBar/>
        <div className='explore-list'>
            {abilityScoresList.map((item, i) => {
                return (
                <div className='test-div' key={i}>
                    <div id='test-button' onClick={() => showMore()}> 
                        {item.name}
                    </div>
                    <div id='infos'>Testing Testing</div>
                </div>
                )
            })}
        </div>

    </div>
  )
}

export default AbilityScores