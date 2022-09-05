import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { Link } from "react-router-dom";
import Loader from '../components/Loader';

function Classes() {

    const [classList, setClassList] = useState([]);
    const [pageLoader, setPageLoader] = useState(true);
    const [error, setError] = useState(null);

    const fetchList = async() => {
      if (classList.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/classes");
          const result = await response.json();
          setClassList(result.results);
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

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Classes</h1>
        {error && <p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
          <>
            <div className='explore-list'>
              {classList.map((item) => {
                return (
                  <Link className='explore-button' to={"/selectedclass"} state={{url: item.url, array: classList}} key={item.index}>{item.name}</Link>
                )
              })}
            </div>
          </>
        }
        
    </div>
  )
}

export default Classes