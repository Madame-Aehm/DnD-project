import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function SelectedEquipmentCategory() {

    const location = useLocation();
    const restURL = location.state.url;
    const cycleArray = location.state.array;
    const searchResult = location.state.searchResult;
    const [controlList, setControlList] = useState([]);
    const [selectedEquipmentCategory, setSelectedEquipmentCategory] = useState([]);
    const [selectedEquipmentCategoryName, setSelectedEquipmentCategoryName] = useState([]);
    const [selectedEquipmentCategoryIndex , setSelectedEquipmentCategoryIndex] = useState("");
    const [pageLoader, setPageLoader] = useState(true);
    const [error, setError] = useState(null);

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
            setPageLoader(false);
        }
    }

    useEffect(() => {
        cycleFetch(restURL);
    }, []);

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
    
  return (
    <div>
        <NavBar/>
        {error && <div className='content-container'><p>Something went wrong.. Please reload.</p></div>}
        {pageLoader && <div className='content-container'><Loader/></div>}
        {!pageLoader && 
            <>
                {searchResult !== "" && <h4 className='ec-h4'>Showing category results for "{searchResult}"</h4>}
                <div className='cycle-buttons-div'>
                    {prevButton()}
                    <h1 className='ec-h1'>{selectedEquipmentCategoryName}</h1>
                    {nextButton()}
                </div>
            </>
        }
        <div className='ec-input-div'>
            <input className='textbox' type={"text"} placeholder={"Search"} onChange={(e) => filter(e.target)}></input>
        </div>
        {!pageLoader &&
            <div className='explore-list'>
                {selectedEquipmentCategory && selectedEquipmentCategory.map((item) => {
                    return <Link className='explore-button' to={"/selectedequipment"} state={{url: item.url, array: selectedEquipmentCategory, searchResult: ""}} key={item.index}>{item.name}</Link>
                })}
                {selectedEquipmentCategory.length === 0 && <p>No Results</p>}
            </div>
        }
    </div>
  )
}

export default SelectedEquipmentCategory