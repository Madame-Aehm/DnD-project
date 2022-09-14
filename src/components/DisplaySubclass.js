import React from 'react'

function DisplaySubclass({ props, handleOnClick} ) {
  const selectedClass = props;
  return (
    <div className='content-container'>
      <div className='display'>
        <h3>Subclass of <a className='display-link' onClick={() => handleOnClick(selectedClass.class.url)}>{selectedClass.class.name}</a></h3>
        <h4>{selectedClass.subclass_flavor}</h4>
        <hr/>
        {selectedClass.spells.length > 0 &&
          <>
            <h4>Spells</h4>
            <div className='mini-h-list'>
              {selectedClass.spells.map((item) => {
                return <h6 key={item.spell.index}>{item.spell.name}</h6>
              })}
            </div>
            <hr/>
          </>
        }
        <h4>Description</h4>
        {selectedClass.desc.map((item) => {
          return <p key={item}>{item}</p>
        })}
      </div>
    </div>
  )
}

export default DisplaySubclass