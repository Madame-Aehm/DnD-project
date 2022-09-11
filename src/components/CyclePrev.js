import React from 'react'

function CyclePrev({ prev, handleOnClick }) {
  if (prev === "end") {
    return (
      <button className='cycle' disabled>↠</button>
    )
  } else {
    return (
      <button className='cycle' onClick={() => {handleOnClick(prev)}}>↠</button>
    )
  }
}

export default CyclePrev