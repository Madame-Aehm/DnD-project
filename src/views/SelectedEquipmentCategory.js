import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar'

function SelectedEquipmentCategory() {

    const location = useLocation();
    const restURL = location.state.url;
    const cycleArray = location.state.array;
    const [controlList, setControlList] = useState([]);
    const [selectedEquipmentCategory, setSelectedEquipmentCategory] = useState([]);
    const [selectedEquipmentCategoryName, setSelectedEquipmentCategoryName] = useState([]);
    const [selectedEquipmentCategoryIndex , setSelectedEquipmentCategoryIndex] = useState("");

    const fetchList = async() => {
        try {
        const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
        const result = await response.json();
        setSelectedEquipmentCategoryIndex(result.index);
        setSelectedEquipmentCategoryName(result.name);
        setSelectedEquipmentCategory(result.equipment);
        setControlList(result.equipment);
      } catch (error) {
        console.log("error", error)
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
            setSelectedEquipmentCategory(result.equipment);
            setControlList(result.equipment);
        } catch (error) {
            console.log("error", error)
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
                <button className='cycle' onClick={() => cycleFetch(next)}>↠</button>
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
                <button className='cycle' onClick={() => cycleFetch(prev)}>↞</button>
            )
        }
    }

    function filter(input) {
        const listClone = [...controlList];
        const inputValue = input.value.toLowerCase().trim();
        const newList = listClone.filter(item => item.index.includes(inputValue));
        console.log(newList);
        console.log(selectedEquipmentCategory);
        setSelectedEquipmentCategory(newList);
    }

  return (
    <div>
        <NavBar/>
        <h4 className='ec-h4'>Equipment Category:</h4>
        <div className='cycle-buttons-div'>
            {prevButton()}
            <h1 className='ec-h1'>{selectedEquipmentCategoryName}</h1>
            {nextButton()}
        </div>
        <div className='ec-input-div'>
            <input className='textbox' type={"text"} placeholder={"Search"} onChange={(e) => filter(e.target)}></input>
        </div>

        <div className='explore-list'>
            {selectedEquipmentCategory && selectedEquipmentCategory.map((item) => {
                return (
                <Link className='explore-button' to={"/selectedequipment"} state={{url: item.url, array: selectedEquipmentCategory}} key={item.index}>{item.name}</Link>
                )
            })}
        </div>
    </div>
  )
}

export default SelectedEquipmentCategory