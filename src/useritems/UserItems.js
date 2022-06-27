import React from 'react'
import EditItemModal from '../edititemmodal/EditItemModal';
import './UserItems.css'

function UserItems({item, deleteItem, setUserItems, setEditUsersItem, setShowEditItemForm, showEditItemForm}) {

  function handleEditItemClick () {
    setShowEditItemForm((showEditItemForm) => !showEditItemForm)
    console.log("I am Clicked!")
  }

  function handleCloseUserItemFormModal () {
    setShowEditItemForm((showEditItemForm) => !showEditItemForm)
  }

  console.log(showEditItemForm)

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
        <button  className="deleteButton" onClick={handleEditItemClick}>Edit</button>
      </div>

      {showEditItemForm? null: <EditItemModal item={item} showEditItemForm={showEditItemForm} setUserItems={setUserItems} setEditUsersItem={setEditUsersItem} handleCloseUserItemFormModal={handleCloseUserItemFormModal}/>}

    </div>
    </>

  )
}

export default UserItems