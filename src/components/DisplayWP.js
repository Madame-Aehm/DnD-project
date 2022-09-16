import React from 'react'

function DisplayWP(props) {
  const WP = props.props;
  return (
    <div className='content-container'>
      <div className='display'>
        <h3>{WP.name}</h3>
        {WP.desc.map((item, i) => {
          return (
              <p key={i}>{item}</p>
          )
        })}
    </div>
    </div>
    
  )
}

export default DisplayWP