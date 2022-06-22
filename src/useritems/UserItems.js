import React from 'react'
import EditItemModal from '../edititemmodal/EditItemModal';
import './UserItems.css'

function UserItems({item, deleteItem, setShowEditItem, showEdititem, userItems, setUserItems, handleEditItemClick}) {
  return (
    <>
    <div className="useritemcard">

        <img className="userItemImage" alt={item.name}src={item.image_url}/>

      <div className="usersItemDetails">
        <h3>{item.item_name}</h3>
        <p>Description: {item.description}</p>
        <p>Condition: {item.condition}/10</p>
        <p>Original Value:{item.original_pricing}</p>
      </div>

      <div className="btnContainer">
        <button onClick={() => deleteItem(item)} className="deleteButton">Delete</button>
        {/* <button  className="deleteButton" onClick={handleEditItemClick}>Edit</button> */}
      </div>

      {showEdititem? null: <EditItemModal item={item} showEditItem={showEdititem} setShowEditItem={setShowEditItem} userItems={userItems} setUserItems={setUserItems}/>}

    </div>
    </>

  )
}

export default UserItems