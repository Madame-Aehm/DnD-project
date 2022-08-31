import React, { useEffect, useState } from 'react'

function Alignments() {
    const [alignmentList, setAlignmentList] = useState([]);
    const fetchList = async() => {
      if (alignmentList.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/alignments");
          const result = await response.json();
          console.log(result);
          setAlignmentList(result.results);
        } catch (error) {
          console.log("error", error)
        }
      }
    }

    useEffect(() => {
        fetchList();
      }, []);

  return (
    <div className='content-container'>Alignments</div>
  )
}

export default Alignments