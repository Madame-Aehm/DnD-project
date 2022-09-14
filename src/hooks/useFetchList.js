import React, { useEffect, useState } from 'react'

function useFetchList(url) {

  const [list, setList] = useState([]);
  const [object, setObject] = useState({});

  const fetchList = async() => {
    if (list.length === 0) {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setList(result.results);
        setObject(result);
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  useEffect(() => {
    fetchList();
  }, []);
  
  return (
    { list, object }
  )
}

export default useFetchList