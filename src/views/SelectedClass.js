import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DisplayClass from '../components/DisplayClass';
import NavBar from '../components/NavBar'

function SelectedClass() {

  const location = useLocation();
  const restURL = location.state.url;
  const cycleArray = location.state.array;
  const [selectedClass, setSelectedClass] = useState([]);

  const fetchList = async() => {
      try {
      const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
      const result = await response.json();
      setSelectedClass(result);
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
      fetchList();
    }, []);

  const cycleFetch = async(URL) => {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${URL}`);
      const result = await response.json();
      setSelectedClass(result);
    } catch (error) {
      console.log("error", error)
    }
  }

  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");

  function findArrayPosition() {
      for (let i = 0; i < cycleArray.length; i++) {
          if (cycleArray[i].index === selectedClass.index) {
              cycleArray[i + 1] ? setNext(cycleArray[i + 1].url) : setNext("end");
              cycleArray[i - 1] ? setPrev(cycleArray[i - 1].url) : setPrev("end");
          }
      }
  }

  useEffect(() => {
      findArrayPosition();
  }, [selectedClass])

  function nextButton() {
      if (next === "end") {
          return (
              <button className='cycle' disabled>↠</button>
          )
      } else {
          return (
              <button className='cycle' onClick={() => cycleFetch(next)}>↠</button>
          )
      }
  }

  function prevButton() {
      if (prev === "end") {
          return (
              <button className='cycle' disabled>↞</button>
          )
      } else {
          return (
              <button className='cycle' onClick={() => cycleFetch(prev)}>↞</button>
          )
      }
  }

  return (
    <div>
      <NavBar/>
      <div className='cycle-buttons-div'>
        {prevButton()}
        <h1>{selectedClass.name}</h1>
        {nextButton()}
      </div>
      <DisplayClass props={selectedClass}/>
    </div>
  )
}

export default SelectedClass