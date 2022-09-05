import React from 'react'

function Loader() {
  return (
    <div className='loader-container'>
      <h4 className='loading-h'>LOADING...</h4>
        <div className='loader-images'>
            <img src='images/d4.png' alt='D4 dice'/>
            <img src='images/d6.png' alt='D6 dice'/>
            <img src='images/d8.png' alt='D8 dice'/>
            <img src='images/d10.png' alt='D10 dice'/>
            <img src='images/d12.png' alt='D12 dice'/>
            <img src='images/d20.png' alt='D20 dice'/>
        </div>
    </div>
  )
}

export default Loader