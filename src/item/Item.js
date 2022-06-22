import React from 'react'
import './Item.css'

function Item({item, setShowClickedItem}) {

  const {item_name, description, original_pricing, condition, image_url} = item
  
  function displayDetails () {
    setShowClickedItem(item)
  }
  
  return (
    <div className="itemCard">
      <img src={image_url} alt={`item of ${item_name}`} onClick={displayDetails}/>
    </div> 
  );
}

export default Item