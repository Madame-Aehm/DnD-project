import React from 'react'

function DisplayDamageType(props) {
  const damageType = props.props;
  return (
    <div className='content-container'>
      <div className='display'>
        <h3>{damageType.name}</h3>
        {damageType.desc.map((item, i) => {
          return (
              <p key={i}>{item}</p>
          )
        })}
      </div>
    </div>
    
  )
}

export default DisplayDamageType