import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';

function SelectedFeature() {
    const location = useLocation();
    const restURL = location.state.url;
    const cycleArray = location.state.array;
    const [selectedFeature, setSelectedFeature] = useState([]);
    const [pageLoader, setPageLoader] = useState(true);
    const [error, setError] = useState(null);

    const fetchList = async() => {
        try {
        const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
        const result = await response.json();
        setSelectedFeature(result);
        setPageLoader(false);
      } catch (error) {
        console.log("error", error)
        setError(error);
      }
    }
  
    useEffect(() => {
        fetchList();
      }, []);

    const cycleFetch = async(URL) => {
        try {
            const response = await fetch(`https://www.dnd5eapi.co${URL}`);
            const result = await response.json();
            setSelectedFeature(result);
            setPageLoader(false);
        } catch (error) {
            console.log("error", error)
            setError(error);
        }
    }

    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");

    function findArrayPosition() {
        for (let i = 0; i < cycleArray.length; i++) {
            if (cycleArray[i].index === selectedFeature.index) {
                cycleArray[i + 1] ? setNext(cycleArray[i + 1].url) : setNext("end");
                cycleArray[i - 1] ? setPrev(cycleArray[i - 1].url) : setPrev("end");
            }
        }
    }
  
    useEffect(() => {
        findArrayPosition();
    }, [selectedFeature])

    function nextButton() {
        if (next === "end") {
            return (
                <button className='cycle' disabled>↠</button>
            )
        } else {
            return (
                <button className='cycle' onClick={() => {
                    setPageLoader(true);
                    cycleFetch(next);
                }}>↠</button>
            )
        }
    }

    function prevButton() {
        if (prev === "end") {
            return (
                <button className='cycle' disabled>↞</button>
            )
        } else {
            return (
                <button className='cycle' onClick={() => {
                    setPageLoader(true);
                    cycleFetch(prev);
                }}>↞</button>
            )
        }
    }

    function RemoveLoader() {
        setPageLoader(false);
    }

  return (
    <div className='content-container'>
        <NavBar/>
        {error && <>{RemoveLoader()} <p>Something went wrong.. Please reload.</p></>}
        {pageLoader && <Loader/>}
        {!pageLoader &&
            <>
                <div className='cycle-buttons-div'>
                    {prevButton()}
                    <h1>{selectedFeature.name}</h1>
                    {nextButton()}
                </div>

                <div className='display'>
                    <h4>Level {selectedFeature.level} {selectedFeature.class.name}</h4>
                    
                <hr/>

                    <h4>Description</h4>
                    {selectedFeature.desc.map((item, i) => {
                        return <p key={i}>{item}</p>
                    })}
                </div>
            </>
        }
    </div>
  )
}

export default SelectedFeature