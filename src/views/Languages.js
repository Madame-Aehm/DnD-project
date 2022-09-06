import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function Languages() {

    const [languagesList, setLanguagesList] = useState([]);
    const [language, setLanguage] = useState({})
    const [pageLoader, setPageLoader] = useState(true);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);

    const fetchList = async() => {
        if (languagesList.length === 0) {
          try {
            const response = await fetch("https://www.dnd5eapi.co/api/languages");
            const result = await response.json();
            setLanguagesList(result.results);
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
            setLanguage(result);
            setLoader(false);
        } catch (error) {
            console.log("error", error)
            setError(error);
        }
    }

    function RemoveLoader() {
        setPageLoader(false);
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

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Languages</h1>
        {error && <>{RemoveLoader()} <p>Something went wrong.. Please reload.</p></>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
            <>
                <div className='checkbox-container-2'>
                    {languagesList.map((item) => {
                    return (
                        <div className='larger-checkbox' key={item.index}>
                            <input type={"radio"} 
                                name={"conditions"} 
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
                            <h3>{language.name}</h3>
                            <p>Script: <b>{language.script}</b> | Type: <b>{language.type}</b></p>
                        <hr/>
                            <h5>Typical Speakers</h5>
                            <div className='mini-h-list'>
                                {language.typical_speakers.map((item, i) => {
                                    return <h6 key={i}>{item}</h6>
                                })}
                            </div>
                        <p></p>
                        </div>
                    </>
                }
            </>
        }
        {setFirstCheck()}
    </div>
  )
}

export default Languages