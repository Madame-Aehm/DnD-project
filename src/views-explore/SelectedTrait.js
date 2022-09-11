import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CycleNext from '../components/CycleNext';
import CyclePrev from '../components/CyclePrev';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useFindArrayPosition from '../hooks/useFindArrayPosition';
import useSubFetch from '../hooks/useSubFetch';

function SelectedTrait() {

  const location = useLocation();
  const [restURL, setRestURL] = useState(location.state.url);
  const cycleArray = location.state.array;
  const searchResult = location.state.searchResult;

  const {
    selected: selectedTrait, 
    loader: pageLoader, 
    subError: error
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleOnClick (url) {
    setRestURL(url);
  }

  const {
    next,
    prev
  } = useFindArrayPosition(cycleArray, selectedTrait);

  return (
    <div className='content-container'>
      <NavBar/>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      <h4 className='ec-h4'>Traits</h4>
      {!pageLoader &&
          <>  
              {searchResult !== "" && <h4 className='ec-h4'>Showing results for "{searchResult}"</h4>}
              <div className='cycle-buttons-div'>
                  <CyclePrev prev={prev} handleOnClick={handleOnClick} />
                  <h1>{selectedTrait.name}</h1>
                  <CycleNext next={next} handleOnClick={handleOnClick} />
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