import React, { useEffect, useState } from 'react'
import { checkFirstCheck } from '../components/Functions';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import useMainFetch from '../hooks/useMainFetch';
import useSubFetch from '../hooks/useSubFetch';

function Feats() {

    const {
        object,
        array: featsList,
        pageLoader,
        error,
      } = useMainFetch("https://www.dnd5eapi.co/api/feats");

      const [restURL, setRestURL] = useState("/api/feats/grappler");
      const {
        selected: feat, 
        loader, 
        subError
      } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)
    
      function handleCheckboxChange (url) {
        setRestURL(url);
    }

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Feats</h1>
        {error && <p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
            <>
                <div className='checkbox-container-3'>
                    {featsList.map((item) => {
                        return (
                            <div key={item.index}>
                                <input type={"radio"} 
                                    name={"feats"} 
                                    value={item.url} id={item.index} 
                                    onChange={
                                    (e) => {handleCheckboxChange(item.url)}
                                    }/>
                                <label className='checkLabel' htmlFor={item.index}><div>{item.name}</div></label>
                            </div>
                        )
                    })}
                </div>
                {checkFirstCheck()}
                {subError && <p>Something went wrong.. Please reload</p>}
                {loader && <p>loading...</p>}
                {!loader &&
                    <>
                        <div className='display'>
                            <h3>{feat.name}</h3>
                            <h4>Prerequisites</h4>
                            {feat.prerequisites.map((item) => {
                                return <p key={item.ability_score.index}>Minimum {item.minimum_score} {item.ability_score.name}</p>
                            })}

                        <hr/>

                            <h4>Description</h4>
                            {feat.desc.map((item, i) => {
                                return (
                                    <p key={i}>{item}</p>
                                )
                            })}
                        </div>
                    </>
                }
            </>
        }
    </div>
  )
}

export default Feats