import React, { useContext, useState } from 'react'
import NavBar from '../components/NavBar'
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config";
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import useFetchList from '../hooks/useFetchList';
import DisplayMyCharacter from '../components/DisplayMyCharacter';

function NewCharacter() {

  const { user } = useContext(AuthContext);
  const [review, setReview] = useState(false);

  const [characterName, setCharacterName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [characterRace, setCharacterRace] = useState("");
  const [characterSpeed, setCharacterSpeed] = useState(0);
  const [characterSize, setCharacterSize] = useState("");
  const [characterHitDie, setCharacterHitDie] = useState(0);
  const [characterTraits, setCharacterTraits] = useState([]);
  const [raceProficiencies, setRaceProficiencies] = useState([]);
  const [classProficiencies, setClassProficiencies] = useState([]);
  const [str, setSTR] = useState(15);
  const [dex, setDEX] = useState(14);
  const [con, setCON] = useState(13);
  const [int, setINT] = useState(12);
  const [wis, setWIS] = useState(10);
  const [cha, setCHA] = useState(8);
  const [abilityBonuses, setAbilityBonuses] = useState([]);

  const character = {
    name: characterName,
    class: characterClass,
    race: characterRace,
    speed: characterSpeed,
    size: characterSize,
    hit_die: characterHitDie,
    traits: characterTraits,
    set_proficiencies: raceProficiencies.concat(classProficiencies),
    stats: [
      {score: str, name: 'Strength', index: 'str'},
      {score: dex, name: 'Dexterity', index: 'dex'},
      {score: con, name: 'Constitution', index: 'con'},
      {score: int, name: 'Intelligence', index: 'int'},
      {score: wis, name: 'Wisdom', index: 'wis'},
      {score: cha, name: 'Charisma', index: 'cha'}
    ],
    ability_bonuses: abilityBonuses
  };

  async function addCharacter () {
    try {
      const docRef = await addDoc(collection(db, "Characters_user" + user.uid), character);
      console.log("Document written with ID: ", docRef.id);
      alert(character.name + " has been created!")
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const [enterCharacterClass, setEnterCharacterClass] = useState("");
  const [enterCharacterRace, setEnterCharacterRace] = useState("");
  const {
    list: classList
  } = useFetchList("https://www.dnd5eapi.co/api/classes");
  const {
    list: raceList
  } = useFetchList("https://www.dnd5eapi.co/api/races");

  const handleCharacterNameChange = (e) => {
    setCharacterName(e.target.value);
  };

  const handleCharacterClassChange = (e) => {
    setEnterCharacterClass(e.target.value);
  };

  const handleCharacterRaceChange = (e) => {
    setEnterCharacterRace(e.target.value);
  };

  const fetchedClass = async(url) => {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${url}`);
      const result = await response.json();
      setCharacterClass(result.name);
      setCharacterHitDie(result.hit_die);
      setClassProficiencies(result.proficiencies);
      console.log(result)
    } catch (error) {
      console.log("error", error);
    }
  }

  const fetchedRace = async(url) => {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${url}`);
      const result = await response.json();
      setCharacterRace(result.name)
      setCharacterSpeed(result.speed);
      setCharacterSize(result.size);
      setCharacterTraits(result.traits);
      setRaceProficiencies(result.starting_proficiencies);
      setAbilityBonuses(result.ability_bonuses);
      console.log(result)
    } catch (error) {
      console.log("error", error);
    }
  }

  
  const shuffle = () => {
    const standardArray = [15, 14, 13, 12, 10, 8];
    standardArray.sort(() => Math.random() - 0.5);
    setSTR(standardArray[0]);
    setDEX(standardArray[1]);
    setCON(standardArray[2]);
    setINT(standardArray[3]);
    setWIS(standardArray[4]);
    setCHA(standardArray[5]);
  }
  const handleOnChangeSTR = (e) => {
    if (e.target.value < 20) {
      setSTR(e.target.value);
    } else {
      setSTR(20);
    }
  };
  const handleOnChangeDEX = (e) => {
    if (e.target.value < 20) {
      setDEX(e.target.value);
    } else {
      setDEX(20);
    }
  };
  const handleOnChangeCON = (e) => {
    if (e.target.value < 20) {
      setCON(e.target.value);
    } else {
      setCON(20);
    }
  };
  const handleOnChangeINT = (e) => {
    if (e.target.value < 20) {
      setINT(e.target.value);
    } else {
      setINT(20);
    }
  };
  const handleOnChangeWIS = (e) => {
    if (e.target.value < 20) {
      setWIS(e.target.value);
    } else {
      setWIS(20);
    }
  };
  const handleOnChangeCHA = (e) => {
    if (e.target.value < 20) {
      setCHA(e.target.value);
    } else {
      setCHA(20);
    }
  };

  function checkAbilityBonus() {
    for (let i = 0; i < character.stats.length; i++) {
      for (let j = 0; j < abilityBonuses.length; j++) {
        if (character.stats[i].index === abilityBonuses[j].ability_score.index) {
          console.log("match found");
          character.stats[i].bonus = abilityBonuses[j].bonus;
        }
      }
    } return character
  }


  return (
    <div className='content-container'>
      <NavBar/>
      {(raceList.length === 0 && classList.length === 0) && <Loader/>}
      {(raceList.length > 0 && classList.length > 0) && <>
        <h1>Create New Character</h1>
          <input type={"text"} placeholder={"Character Name"} value={characterName} onChange={handleCharacterNameChange} required></input>

          <select id='character-class' name='character-class' onChange={handleCharacterClassChange} required>
            <option value={""}>Select Class...</option>
            {classList && classList.map((item) => {
              return (
                <option key={item.index} value={item.url}>{item.name}</option>
              )
            })}
          </select>

          <select id='character-race' name='character-race' onChange={handleCharacterRaceChange} required>
            <option value={""}>Select Race...</option>
            {raceList && raceList.map((item) => {
              return (
                <option key={item.index} value={item.url}>{item.name}</option>
              )
            })}
          </select>
          <table className='choose-stats'>
            <tbody>
              <tr>
                <th></th>
                <th>STR</th>
                <th>DEX</th>
                <th>CON</th>
                <th>INT</th>
                <th>WIS</th>
                <th>CHA</th>
              </tr>
              <tr>
                <td><button title='Shuffle stats with Standard Array' onClick={() => shuffle()}>↻</button></td>
                <td><input onChange={handleOnChangeSTR} value={str}/></td>
                <td><input onChange={handleOnChangeDEX} value={dex}/></td>
                <td><input onChange={handleOnChangeCON} value={con}/></td>
                <td><input onChange={handleOnChangeINT} value={int}/></td>
                <td><input onChange={handleOnChangeWIS} value={wis}/></td>
                <td><input onChange={handleOnChangeCHA} value={cha}/></td>
              </tr>
            </tbody>
          </table>

          <button className='explore-button' onClick={() => {
              (fetchedClass(enterCharacterClass))
              .then(fetchedRace(enterCharacterRace))
              setReview(true);
            }}>Review character...</button>

          {review && 
              <div className='display'>
                <h4>{character.name}, the {character.class} {character.race}</h4>
                <DisplayMyCharacter character={character} />
                <button className='explore-button' onClick={() => addCharacter()}>Create Character</button>
              </div>
          }
      </>}

    </div>
  )
}

export default NewCharacter