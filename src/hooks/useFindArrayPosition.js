import React, { useEffect, useState } from 'react'

function useFindArrayPosition(cycleArray, selected) {
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");

  const findArrayPosition = () => {
    for (let i = 0; i < cycleArray.length; i++) {
      if (cycleArray[i].index === selected.index) {
        cycleArray[i + 1] ? setNext(cycleArray[i + 1].url) : setNext("end");
        cycleArray[i - 1] ? setPrev(cycleArray[i - 1].url) : setPrev("end");
      }
    }
  }
  useEffect(() => {
   findArrayPosition();
  }, [selected])
  
  return (
    {next, prev}
  )
}

export default useFindArrayPosition