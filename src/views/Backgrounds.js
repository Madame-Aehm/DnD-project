import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function Backgrounds() {

  const [bgList, setBgList] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState(null);


    const fetchList = async() => {
      if (bgList.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/backgrounds");
          const result = await response.json();
          setBgList(result.results);
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
    <h1>Backgrounds</h1>
    {error && <p>Something went wrong.. Please reload.</p>}
    {pageLoader && <Loader/>}
    {!pageLoader &&
      <>
        <div className='explore-list'>
              {bgList.map((item) => {
                return (
                  <Link className='explore-button' to={"/selectedbg"} state={{url: item.url, array: bgList}} key={item.index}>{item.name}</Link>
                )
              })}
          </div>
      </>
    }
    
</div>
  )
}

export default Backgrounds