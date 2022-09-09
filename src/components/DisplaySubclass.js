import React from 'react'
import MagicItems from '../views-explore/MagicItems';

function DisplaySubclass(props) {
  const selectedClass = props.props;
  return (
    <div className='content-container'>
      <div className='display'>
        <h3>{selectedClass.class.name}</h3>
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