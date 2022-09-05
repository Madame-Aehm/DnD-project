import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function Features() {

    const [featuresList, setFeaturesList] = useState([]);
    const [controlList, setControlList] = useState([]);
    const [pageLoader, setPageLoader] = useState(true);
    const [error, setError] = useState(null);

    const fetchList = async() => {
        if (featuresList.length === 0) {
          try {
            const response = await fetch("https://www.dnd5eapi.co/api/features");
            const result = await response.json();
            setFeaturesList(result.results);
            setControlList(result.results);
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

    function filter(input) {
        const listClone = [...controlList];
        const inputValue = input.value.toLowerCase().trim();
        const newList = listClone.filter(item => item.index.includes(inputValue));
        setFeaturesList(newList);
      }

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Features</h1>
        {error && <p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
        <>
            <input className='textbox' type={"text"} placeholder={"Search"} onChange={(e) => filter(e.target)}></input>
            <div className='explore-list'>
                {featuresList.map((item) => {
                return (
                    <Link className='explore-button' to={"/selectedfeature"} state={{url: item.url, array: featuresList}} key={item.index}>{item.name}</Link>
                )
                })}
                {featuresList.length === 0 && <p>No Results</p>}
            </div>
        </>
          
        }
    </div>
  )
}

export default Features