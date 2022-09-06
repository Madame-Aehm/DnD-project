import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';

function Feats() {

    const [featsList, setFeatsList] = useState([]);
    const [pageLoader, setPageLoader] = useState(true);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);
    const [feat, setFeat] = useState({});

    const fetchList = async() => {
        if (featsList.length === 0) {
          try {
            const response = await fetch("https://www.dnd5eapi.co/api/feats");
            const result = await response.json();
            setFeatsList(result.results);
            setTimeout(() => {
              setPageLoader(false);
            }, 1000);
          } catch (error) {
            console.log("error", error)
            setError(error);
          }
        }
      }
  
    useEffect(() => {
        fetchList();
    }, []);

    async function scoreFetch(restURL) {
        try {
            const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
            const result = await response.json();
            setLoader(false);
            setFeat(result);
        } catch (error) {
            console.log("error", error)
            setError(error);
        }
    }

    function setFirstCheck() {
        const allChecks = document.querySelectorAll("input");
        const firstCheck = document.querySelector("input");
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

    function RemoveLoader() {
        setPageLoader(false);
    }

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Feats</h1>
        {error && <>{RemoveLoader()} <p>Something went wrong.. Please reload.</p></>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
            <>
                <div className='checkbox-container-2'>
                    {featsList.map((item) => {
                        return (
                            <div className='larger-checkbox' key={item.index}>
                                <input type={"radio"} 
                                    name={"feats"} 
                                    value={item.url} id={item.index} 
                                    onChange={
                                    (e) => {
                                        setLoader(true);
                                        scoreFetch(item.url)
                                    }
                                    }/>
                                <label htmlFor={item.index}>{item.name}</label>
                            </div>
                        )
                    })}
                </div>

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