import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function SelectedEquipmentCategory() {
    const [pageLoader, setPageLoader] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRule, setSelectedRule] = useState({});
    const [ruleList, setRuleList] = useState([]);

    const location = useLocation();
    const {
        url,
        searchResult
     } = location.state;

    async function makeFetch (restURL) {
        try {
            const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
            const result = await response.json();
            setSelectedRule(result);
            setRuleList(result.subsections);
            setPageLoader(false);
        } catch (error) {
            console.log("error", error)
            setError(error);
            setPageLoader(false);
        }
    }

    useEffect(() => {
      makeFetch(url);
    }, [])
    

    const [filter, setFilter] = useState("");
    const filteredList = ruleList.filter((item) => item.name.toLowerCase().includes(filter));
  
    const handleFilterChange = (e) => {
      setFilter(e.target.value.toLowerCase());
    };
    
  return (
    <div className='content-container'>
        <NavBar/>
        {error && <div className='content-container'><p>Something went wrong.. Please reload.</p></div>}
        {pageLoader && <div className='content-container'><Loader/></div>}

        {!pageLoader &&
            <>
                <h4 className='ec-h4'>Rules</h4>
                {searchResult !== "" && <h4 className='ec-h4'>Showing category results for "{searchResult}"</h4>}
                <h1 className='ec-h1'>{selectedRule.name}</h1>
                <input className='textbox' type={"text"} placeholder={"Search"} value={filter} onChange={handleFilterChange}></input>
                <div className='explore-list'>
                    {filteredList && filteredList.map((item) => {
                        return <Link className='explore-button' to={"/selected"} state={{url: item.url, array: filteredList, searchResult: (searchResult + " " + filter), category: "Rules"}} key={item.index}>{item.name}</Link>
                    })}
                    {filteredList.length === 0 && <p>No Results</p>}
                </div>
            </>
        }
    </div>
  )
}

export default SelectedEquipmentCategory