import React from 'react'

function DisplayProficiency(props) {
  const selectedProficiency = props.props;
  return (
    <div className='content-container'>
      <div className='display'>
        <h4>Type:</h4>
        <p>{selectedProficiency.type}</p>

      <hr/>

          {selectedProficiency.classes.length === 0 && <h4>All Classes</h4>}
          {selectedProficiency.classes.length > 0 && 
            <>
              <h4>Classes</h4>
              <div className='mini-h-list'>
                {selectedProficiency.classes.map((item) => {
                  return <h6 key={item.index}>{item.name}</h6>
                })}
              </div>
            <hr/>
            </>
          }

          {selectedProficiency.races.length === 0 && <h4>All Races</h4>}
          {selectedProficiency.races.length > 0 && 
            <>
              <h4>Races</h4>
              <div className='mini-h-list'>
                {selectedProficiency.races.map((item) => {
                  return <h6 key={item.index}>{item.name}</h6>
                })}
              </div>
            <p></p>
            </>
          
          }
      </div>
    </div>
    
  )
}

export default DisplayProficiency