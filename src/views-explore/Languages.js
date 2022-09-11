import React, { useEffect, useState } from 'react'
import { checkFirstCheck } from '../components/Functions';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';
import useSubFetch from '../hooks/useSubFetch';

function Languages() {

    const {
        object,
        array: languagesList,
        pageLoader,
        error,
    } = useMainFetch("https://www.dnd5eapi.co/api/languages");

    const [restURL, setRestURL] = useState("/api/languages/abyssal");
    const {
        selected: language, 
        loader, 
        subError
    } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

    function handleCheckboxChange (url) {
        setRestURL(url);
    }

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Languages</h1>
        {error && <p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
            <>
                <div className='checkbox-container-3'>
                    {languagesList.map((item) => {
                    return (
                        <div key={item.index}>
                            <input type={"radio"} 
                                name={"conditions"} 
                                value={item.url} id={item.index} 
                                onChange={
                                (e) => {handleCheckboxChange(item.url)}
                                }/>
                            <label htmlFor={item.index}><div>{item.name}</div></label>
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
                            <h3>{language.name}</h3>
                            <p>Script: <b>{language.script}</b> | Type: <b>{language.type}</b></p>
                        <hr/>
                            <h5>Typical Speakers</h5>
                            <div className='mini-h-list'>
                                {language.typical_speakers.map((item, i) => {
                                    return <h6 key={i}>{item}</h6>
                                })}
                            </div>
                        </div>
                    </>
                }
            </>
        }
    </div>
  )
}

export default Languages