import React from 'react'
import { Link } from 'react-router-dom'

function DisplayFavourite({ array, deleteFavourite }) {
  return (
    <div className='character-card-display'>
    {array.length === 0 && <p>No favourites yet</p>}
    {array.length > 0 && array.map((item) => {
      return (
        <div className='character-card' key={item.id}>
          <h4>{item.name}</h4>
          <div>
            <Link 
              to={"/selected"} 
              state={{url: item.url, 
                array: array, 
                searchResult: "Favourite ", 
                category: item.fav_category}}>
              View Page
            </Link>
            <button onClick={() => deleteFavourite(item)}>Delete</button>
          </div>
        </div>
      )
    })}
  </div>
  )
}

export default DisplayFavourite