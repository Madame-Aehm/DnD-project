import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function SelectedTrait() {

  const location = useLocation();
  const restURL = location.state.url;
  const cycleArray = location.state.array;
  const searchResult = location.state.searchResult;
  const [selectedTrait, setSelectedTrait] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState(null);

  const cycleFetch = async(URL) => {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${URL}`);
      const result = await response.json();
      setSelectedTrait(result);
      setPageLoader(false);
    } catch (error) {
      console.log("error", error)
      setError(error);
      setPageLoader(false);
    }
  }

  useEffect(() => {
    cycleFetch(restURL);
  }, []);

  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");

  function findArrayPosition() {
    for (let i = 0; i < cycleArray.length; i++) {
      if (cycleArray[i].index === selectedTrait.index) {
        cycleArray[i + 1] ? setNext(cycleArray[i + 1].url) : setNext("end");
        cycleArray[i - 1] ? setPrev(cycleArray[i - 1].url) : setPrev("end");
      }
    }
  }

  useEffect(() => {
    findArrayPosition();
  }, [selectedTrait]);


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

  return (
    <div className='content-container'>
      <NavBar/>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader &&
          <>  
              {searchResult !== "" && <h4 className='ec-h4'>Showing results for "{searchResult}"</h4>}
              <div className='cycle-buttons-div'>
                  {prevButton()}
                  <h1>{selectedTrait.name}</h1>
                  {nextButton()}
              </div>
              <div className='display'>
                <h4>Races</h4>
                {selectedTrait.races.length === 0 && <p>-</p>}
                {selectedTrait.races.length > 0 && 
                  <>
                    <div className='mini-h-list'>
                      {selectedTrait.races.map((item) => {
                        return <h6 key={item.index}>{item.name}</h6>
                      })}
                    </div>
                  </>
                }

                <h4>Subraces</h4>
                {selectedTrait.subraces.length === 0 && <p>-</p>}
                {selectedTrait.subraces.length > 0 && 
                  <>
                    <div className='mini-h-list'>
                      {selectedTrait.subraces.map((item) => {
                        return <h6 key={item.index}>{item.name}</h6>
                      })}
                    </div>
                  </>
                }
                <hr/>

                <h4>Description</h4>
                {selectedTrait.desc.map((item) => {
                  return <p key={item}>{item}</p>
                })}

              </div>
          </>
      }
    </div>
  )
}

export default SelectedTrait