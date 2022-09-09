import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import useMainFetch from '../hooks/useMainFetch';

function Feats() {

    const {
        object,
        array: featsList,
        pageLoader,
        error,
      } = useMainFetch("https://www.dnd5eapi.co/api/feats");

    async function scoreFetch(restURL) {
        try {
            const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
            const result = await response.json();
            setLoader(false);
            setFeat(result);
        } catch (error) {
            console.log("error", error)
            setSubError(error);
            setLoader(false);
        }
    }

    const [loader, setLoader] = useState(true);
    const [feat, setFeat] = useState({});
    const [subError, setSubError] = useState(null);

    function setFirstCheck() {
        const allChecks = document.querySelectorAll("input[type='radio']");
        const firstCheck = document.querySelector("input[type='radio']");
        let isChecked = false;
        for (let i = 0; i < allChecks.length; i++) {
          if (allChecks[i].checked) {
            isChecked = true;
            break;
          }
        }
        if (!isChecked && firstCheck) {
          firstCheck.checked = true;
          scoreFetch(firstCheck.value);
        }
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
                                    (e) => {
                                        setLoader(true);
                                        scoreFetch(item.url)
                                    }
                                    }/>
                                <label htmlFor={item.index}><div>{item.name}</div></label>
                            </div>
                        )
                    })}
                </div>
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
        {setFirstCheck()}
    </div>
  )
}

export default Feats