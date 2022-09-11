import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CycleNext from '../components/CycleNext';
import CyclePrev from '../components/CyclePrev';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useFindArrayPosition from '../hooks/useFindArrayPosition';
import useSubFetch from '../hooks/useSubFetch';

function SelectedProficiency() {

  const location = useLocation();
  const [restURL, setRestURL] = useState(location.state.url);
  const cycleArray = location.state.array;
  const searchResult = location.state.searchResult;

  const {
    selected: selectedProficiency, 
    loader: pageLoader, 
    subError: error
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleOnClick (url) {
    setRestURL(url);
  }

  const {
    next,
    prev
  } = useFindArrayPosition(cycleArray, selectedProficiency);

  return (
    <div className='content-container'>
      <NavBar/>
      {error && <div className='content-container'><p>Something went wrong.. Please reload.</p></div>}
      {pageLoader && <div className='content-container'><Loader/></div>}
      <h4 className='ec-h4'>Proficiencies</h4>
      {!pageLoader && 
        <>
          {searchResult !== "" && <h4 className='ec-h4'>Showing results for "{searchResult}"</h4>}
          <div className='cycle-buttons-div'>
              <CyclePrev prev={prev} handleOnClick={handleOnClick} />
              <h1 className='ec-h1'>{selectedProficiency.name}</h1>
              <CycleNext next={next} handleOnClick={handleOnClick} />
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