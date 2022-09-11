import React from 'react'

function CycleNext({ next, handleOnClick }) {
  if (next === "end") {
    return (
      <button className='cycle' disabled>↠</button>
    )
  } else {
    return (
      <button className='cycle' onClick={() => {handleOnClick(next)}}>↠</button>
    )
  }
}

export default CycleNext