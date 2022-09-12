import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config";
import { AuthContext } from '../context/AuthContext';
import { async } from '@firebase/util';



function Characters() {

  const { user } = useContext(AuthContext);
  const [classList, setClassList] = useState([]);
  const [raceList, setRaceList] = useState([]);
  const [charactersArray, setCharactersArray] = useState(null); 
  const [enterCharacterName, setEnterCharacterName] = useState("");
  const [enterCharacterClass, setEnterCharacterClass] = useState("");
  const [enterCharacterRace, setEnterCharacterRace] = useState("");


  const fetchClasses = async() => {
    if (classList === 0) {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/classes");
        const result = await response.json();
        setClassList(result.results);
        console.log(result.results);
      } catch (error) {
        console.log("error", error);
        // setError(error);
      }
    }
    
  }

  const fetchRaces = async() => {
    if (raceList.length === 0) {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/races");
        const result = await response.json();
        setRaceList(result.results);
        console.log(result.results);
      } catch (error) {
        console.log("error", error);
        // setError(error);
      }
    }
  }

  async function addCharacter () {
    try {
      const docRef = await addDoc(collection(db, "Characters_user" + user.uid), {
        name: enterCharacterName,
        class: enterCharacterClass,
        race: enterCharacterRace,
      });
      console.log("Document written with ID: ", docRef.id);
      getCharacters();
      setEnterCharacterName("");
      setEnterCharacterClass("");
      setEnterCharacterRace("");
      const dropdowns = document.querySelectorAll("select");
      dropdowns.value = "";

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  

  async function getCharacters () {
    const querySnapshot = await getDocs(collection(db, "Characters_user" + user.uid));
    const array = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      array.push(data);
    });
    setCharactersArray(array);
  }
  
  const handleCharacterNameChange = (e) => {
    setEnterCharacterName(e.target.value);
  };

  const handleCharacterClassChange = (e) => {
    setEnterCharacterClass(e.target.value);
  };

  const handleCharacterRaceChange = (e) => {
    setEnterCharacterRace(e.target.value);
  };

  useEffect(() => {
    getCharacters();
    fetchClasses();
    fetchRaces();
  }, []);


  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Characters</h1>
      <input type={"text"} placeholder={"Character Name"} value={enterCharacterName} onChange={handleCharacterNameChange} required></input>
      {/* <input type={"text"} placeholder={"Character Class"} value={enterCharacterClass} onChange={handleCharacterClassChange}></input>
      <input type={"text"} placeholder={"Character Race"} value={enterCharacterRace} onChange={handleCharacterRaceChange}></input> */}
      <select id='character-class' name='character-class' onChange={handleCharacterClassChange} required>
        <option value={""}>Select Class...</option>
        {classList && classList.map((item) => {
          return (
            <option key={item.index} value={item.name}>{item.name}</option>
          )
        })}
      </select>
      <select id='character-race' name='character-race' onChange={handleCharacterRaceChange} required>
        <option value={""}>Select Race...</option>
        {raceList && raceList.map((item) => {
          return (
            <option key={item.index} value={item.name}>{item.name}</option>
          )
        })}
      </select>
      <button className='explore-button' onClick={() => addCharacter()}>Add Character</button>
      <h3>My Characters:</h3>
      <div className='character-card-display'>
        {charactersArray && charactersArray.map((character) => {
          return (
            <div className='character-card' key={character.id}>
              <h4>{character.name}, the {character.class} {character.race}</h4>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Characters