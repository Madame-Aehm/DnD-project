import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function Conditions() {

  const [conditionsList, setConditionsList] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);


  const fetchList = async() => {
    if (conditionsList.length === 0) {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/conditions");
        const result = await response.json();
        setConditionsList(result.results);
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
        setConditionsDescription(result.desc);
        setconditionsTitle(result.name);
        setLoader(false);
    } catch (error) {
        console.log("error", error)
        setError(error);
    }
  }

  const [conditionsTitle, setconditionsTitle] = useState("");
  const [conditionsDescription, setConditionsDescription] = useState([]);

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
      <h1>Conditions</h1>
      {error && <>{RemoveLoader()}<p>Something went wrong.. Please reload.</p></>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
        <>
          <div className='checkbox-container-2'>
            {conditionsList.map((item) => {
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
                <h3>{conditionsTitle}</h3>
                  {conditionsDescription.map((item, i) => {
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

export default Conditions