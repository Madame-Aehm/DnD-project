import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function SelectedEquipmentCategory() {

    const location = useLocation();
    const restURL = location.state.url;
    const cycleArray = location.state.array;
    const [controlList, setControlList] = useState([]);
    const [selectedEquipmentCategory, setSelectedEquipmentCategory] = useState([]);
    const [selectedEquipmentCategoryName, setSelectedEquipmentCategoryName] = useState([]);
    const [selectedEquipmentCategoryIndex , setSelectedEquipmentCategoryIndex] = useState("");
    const [pageLoader, setPageLoader] = useState(true);
    const [error, setError] = useState(null);

    const fetchList = async() => {
        try {
        const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
        const result = await response.json();
        setSelectedEquipmentCategoryIndex(result.index);
        setSelectedEquipmentCategoryName(result.name);
        setSelectedEquipmentCategory(result.equipment);
        setControlList(result.equipment);
        setTimeout(() => {
            setPageLoader(false);
        }, 1000);
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
            setSelectedEquipmentCategoryIndex(result.index);
            setSelectedEquipmentCategoryName(result.name);
            setControlList(result.equipment);
            setPageLoader(false);
            const fetchedArray = result.equipment;
            const input = document.querySelector("input");
            if (input.value) {
                cycleFetchFilter(input, fetchedArray)
            } else {
                setSelectedEquipmentCategory(result.equipment);
            }
        } catch (error) {
            console.log("error", error)
            setError(error);
        }
    }

    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");

    function findArrayPosition() {
        for (let i = 0; i < cycleArray.length; i++) {
            if (cycleArray[i].index === selectedEquipmentCategoryIndex) {
                cycleArray[i + 1] ? setNext(cycleArray[i + 1].url) : setNext("end");
                cycleArray[i - 1] ? setPrev(cycleArray[i - 1].url) : setPrev("end");
            }
        }
    }

    useEffect(() => {
        findArrayPosition();
    }, [selectedEquipmentCategory])

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

    function filter(input) {
        const listClone = [...controlList];
        const inputValue = input.value.toLowerCase().trim();
        const newList = listClone.filter(item => item.index.includes(inputValue));
        setSelectedEquipmentCategory(newList);
    }

    function cycleFetchFilter(input, array) {
        const inputValue = input.value.toLowerCase().trim();
        const filteredArray = array.filter(item => item.index.includes(inputValue));
        setSelectedEquipmentCategory(filteredArray);
    }

    function RemoveLoader() {
        setPageLoader(false);
    }

  return (
    <div>
        <NavBar/>
        <h4 className='ec-h4'>Equipment Category:</h4>
        {error && <div className='content-container'>{RemoveLoader()}<p>Something went wrong.. Please reload.</p></div>}
        {pageLoader && <div className='content-container'><Loader/></div>}
        {!pageLoader && 
            <div className='cycle-buttons-div'>
                {prevButton()}
                <h1 className='ec-h1'>{selectedEquipmentCategoryName}</h1>
                {nextButton()}
            </div>
        }
        <div className='ec-input-div'>
            <input className='textbox' type={"text"} placeholder={"Search"} onChange={(e) => filter(e.target)}></input>
        </div>
        {!pageLoader &&
            <div className='explore-list'>
                {selectedEquipmentCategory && selectedEquipmentCategory.map((item) => {
                    return <Link className='explore-button' to={"/selectedequipment"} state={{url: item.url, array: selectedEquipmentCategory}} key={item.index}>{item.name}</Link>
                })}
                {selectedEquipmentCategory.length === 0 && <p>No Results</p>}
            </div>
        }
        
    </div>
  )
}

export default SelectedEquipmentCategory