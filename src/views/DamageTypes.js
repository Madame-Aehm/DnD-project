import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function DamageTypes() {

    const [damageTypesList, setDamageTypesList] = useState([]);
    const [pageLoader, setPageLoader] = useState(true);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);

    const fetchList = async() => {
      if (damageTypesList.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/damage-types");
          const result = await response.json();
          setDamageTypesList(result.results);
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
          setDamageTypesDescription(result.desc);
          setdamageTypesTitle(result.name);
          setLoader(false);
      } catch (error) {
          console.log("error", error)
          setError(error);
      }
    }

    const [damageTypesTitle, setdamageTypesTitle] = useState("")
    const [damageTypesDescription, setDamageTypesDescription] = useState([]);

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
        {error && <p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
          <>
            <h1>Damage Types</h1>
            <div className='checkbox-container-2'>
              {damageTypesList.map((item) => {
                  return (
                      <div className='larger-checkbox' key={item.index}>
                          <input type={"radio"} 
                            name={"damage-types"} 
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
              <div className='display'>
                <h3>{damageTypesTitle}</h3>
                {damageTypesDescription.map((item, i) => {
                  return (
                      <p key={i}>{item}</p>
                  )
                })}
              </div>
            }
          </>
        }
        {setFirstCheck()}

    </div>
  )
}

export default DamageTypes