import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function SelectedProficiency() {

  const location = useLocation();
  const restURL = location.state.url;
  const cycleArray = location.state.array;
  const [selectedProficiency, setSelectedProficiency] = useState({});
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState(null);

  const fetchList = async() => {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
      const result = await response.json();
      console.log(result);
      setSelectedProficiency(result);
      setPageLoader(false);
    } catch (error) {
      console.log("error", error)
      setError(error);
    }
  }

  useEffect(() => {
      fetchList();
  }, []);

  const cycleFetch = async(URL) => {
    try {
        const response = await fetch(`https://www.dnd5eapi.co${URL}`);
        const result = await response.json();
        console.log(result);
        setSelectedProficiency(result);
        setPageLoader(false);
    } catch (error) {
        console.log("error", error)
        setError(error);
    }
}

  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");

  function findArrayPosition() {
    for (let i = 0; i < cycleArray.length; i++) {
      if (cycleArray[i].index === selectedProficiency.index) {
        cycleArray[i + 1] ? setNext(cycleArray[i + 1].url) : setNext("end");
        cycleArray[i - 1] ? setPrev(cycleArray[i - 1].url) : setPrev("end");
      }
    }
  }

  useEffect(() => {
    findArrayPosition();
  }, [selectedProficiency])

  function nextButton() {
    if (next === "end") {
      return (
        <button className='cycle' disabled>↠</button>
      )
    } else {
      return (
        <button className='cycle' onClick={() => {
          setPageLoader(true);
          cycleFetch(next);
        }}>↠</button>
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
        <button className='cycle' onClick={() => {
          setPageLoader(true);
          cycleFetch(prev);
        }}>↞</button>
      )
    }
  }

  

  function RemoveLoader() {
    setPageLoader(false);
  }

  return (
    <div className='content-container'>
      <NavBar/>
      {error && <div className='content-container'>{RemoveLoader()}<p>Something went wrong.. Please reload.</p></div>}
      {pageLoader && <div className='content-container'><Loader/></div>}
      <h4 className='ec-h4'>Proficiency</h4>
      {!pageLoader && 
        <>
          <div className='cycle-buttons-div'>
              {prevButton()}
              <h1 className='ec-h1'>{selectedProficiency.name}</h1>
              {nextButton()}
          </div>

          <div className='display'>
            <h4>Type:</h4>
            <p>{selectedProficiency.type}</p>

          <hr/>

              {selectedProficiency.classes.length === 0 && <h4>All Classes</h4>}
              {selectedProficiency.classes.length > 0 && 
                <>
                  <h4>Classes</h4>
                  <div className='mini-h-list'>
                    {selectedProficiency.classes.map((item) => {
                      return <h6 key={item.index}>{item.name}</h6>
                    })}
                  </div>
                <hr/>
                </>
              }

              {selectedProficiency.races.length === 0 && <h4>All Races</h4>}
              {selectedProficiency.races.length > 0 && 
                <>
                  <h4>Races</h4>
                  <div className='mini-h-list'>
                    {selectedProficiency.races.map((item) => {
                      return <h6 key={item.index}>{item.name}</h6>
                    })}
                  </div>
                <p></p>
                </>
              
              }
          </div>
        </>
      }
    </div>
  )
}

export default SelectedProficiency