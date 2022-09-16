import React from 'react'

function DisplayFeature(props) {
  const selectedFeature = props.props;
  return (
    <div className='content-container'>
      <div className='display'>
        <h4>Level {selectedFeature.level} {selectedFeature.class.name}</h4>
        
    <hr/>

        <h4>Description</h4>
        {selectedFeature.desc.map((item, i) => {
            return <p key={i}>{item}</p>
        })}
      </div>
    </div>
    
  )
}

export default DisplayFeature