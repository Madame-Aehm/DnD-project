import React from 'react'

function DisplayTrait(props) {
  const selectedTrait = props.props;
  return (
    <div className='content-container'>
      <div className='display'>
        <h4>Races</h4>
        {selectedTrait.races.length === 0 && <p>-</p>}
        {selectedTrait.races.length > 0 && 
          <>
            <div className='mini-h-list'>
              {selectedTrait.races.map((item) => {
                return <h6 key={item.index}>{item.name}</h6>
              })}
            </div>
          </>
        }

        <h4>Subraces</h4>
        {selectedTrait.subraces.length === 0 && <p>-</p>}
        {selectedTrait.subraces.length > 0 && 
          <>
            <div className='mini-h-list'>
              {selectedTrait.subraces.map((item) => {
                return <h6 key={item.index}>{item.name}</h6>
              })}
            </div>
          </>
        }
        <hr/>

        <h4>Description</h4>
        {selectedTrait.desc.map((item) => {
          return <p key={item}>{item}</p>
        })}

      </div>
    </div>
    
  )
}

export default DisplayTrait