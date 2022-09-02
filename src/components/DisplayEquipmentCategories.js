import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DisplayEquipmentCategoriesPlus from './DisplayEquipmentCategoriesPlus';


function DisplayEquipmentCategories(props) {

    const [selectedEquipmentCategory, setSelectedEquipmentCategory] = useState([props.props])
    const controlList = props.controlList;
    console.log(props.props)

    function filter(input) {
        const listClone = [...controlList];
        const inputValue = input.value.toLowerCase().trim();
        const newList = listClone.filter(item => item.index.includes(inputValue));
        setSelectedEquipmentCategory(newList);
      }


  
        return (
            <DisplayEquipmentCategoriesPlus props={selectedEquipmentCategory} />
        )
}

export default DisplayEquipmentCategories