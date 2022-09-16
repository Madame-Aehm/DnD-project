import React from 'react'

function DisplayCondition(props) {
  const condition = props.props;
  return (
    <div className='content-container'>
      <div className='display'>
        <h3>{condition.name}</h3>
          {condition.desc.map((item, i) => {
              return (
                  <p key={i}>{item}</p>
              )
          })}
      </div>
    </div>
    
  )
}

export default DisplayCondition