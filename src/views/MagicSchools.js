import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function MagicSchools() {

  const [magicSchoolsList, setMagicSchoolsList] = useState([]);
  const [magicSchool, setMagicSchool] = useState({});
  const [pageLoader, setPageLoader] = useState(true);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  const fetchList = async() => {
    if (magicSchoolsList.length === 0) {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/magic-schools");
        const result = await response.json();
        setMagicSchoolsList(result.results);
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
      setMagicSchool(result);
      setLoader(false);
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
      <h1>Magic Schools</h1>
      {error && <>{RemoveLoader()} <p>Something went wrong.. Please reload.</p></>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
        <>
          <div className='checkbox-container-2'>
            {magicSchoolsList.map((item) => {
                return (
                  <div className='larger-checkbox' key={item.index}>
                      <input type={"radio"} 
                        name={"magicschools"} 
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
          <div className='display'>
            {!loader &&
              <>
                <h3>{magicSchool.name}</h3>
                <p>{magicSchool.desc}</p>
              </> 
            }
          </div>
        </>
      }
      {setFirstCheck()}
    </div>
  )
}

export default MagicSchools