import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import CycleNext from '../components/CycleNext';
import CyclePrev from '../components/CyclePrev';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import useFindArrayPosition from '../hooks/useFindArrayPosition';
import useSubFetch from '../hooks/useSubFetch';

function SelectedFeature() {
  const location = useLocation();
  const [restURL, setRestURL] = useState(location.state.url);
  const cycleArray = location.state.array;
  const searchResult = location.state.searchResult;

  const {
    selected: selectedFeature, 
    loader: pageLoader, 
    subError: error
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleOnClick (url) {
    setRestURL(url);
  }

  const {
    next,
    prev
  } = useFindArrayPosition(cycleArray, selectedFeature);

  return (
    <div className='content-container'>
        <NavBar/>
        {error && <p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        <h4 className='ec-h4'>Features</h4>
        {!pageLoader &&
            <>
                {searchResult !== "" && <h4 className='ec-h4'>Showing results for "{searchResult}"</h4>}
                <div className='cycle-buttons-div'>
                    <CyclePrev prev={prev} handleOnClick={handleOnClick} />
                    <h1>{selectedFeature.name}</h1>
                    <CycleNext next={next} handleOnClick={handleOnClick} />
                </div>

                <div className='display'>
                    <h4>Level {selectedFeature.level} {selectedFeature.class.name}</h4>
                    
                <hr/>

                    <h4>Description</h4>
                    {selectedFeature.desc.map((item, i) => {
                        return <p key={i}>{item}</p>
                    })}
                </div>
            </>
        }
    </div>
  )
}

export default SelectedFeature