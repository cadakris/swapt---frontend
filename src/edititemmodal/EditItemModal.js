import React, { useState } from 'react'
import './EditItemModal.css'

function EditItemModal({setUserItems, handleCloseUserItemFormModal, item}) {

  const {item_name, description, original_pricing,condition} = item

  const [formState, setFormState] = useState({
    item_name: `${item_name}`,
    description: `${description}`,
    original_pricing: `${original_pricing}`,
    condition: `${condition}`
  })

  function handleItemEditChange (e) {
    setFormState({...formState, [e.target.name]:e.target.value})
  }

  const editUserItems = (e) => {
    e.preventDefault()
    fetch(`http://localhost:9292/edituseritems/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify ({
        item_name: formState.item_name,
        description: formState.description,
        original_pricing: formState.original_pricing,
        condition: formState.condition
      })
    })
    .then((res) => res.json())
    .then(updatedUserItem => {
      setFormState(updatedUserItem)
    })
    .then(() => {
      fetch('http://localhost:9292/userincludeitems')
      .then((res) => res.json())
      .then((newUserItemInfo) => setUserItems(newUserItemInfo))
    })
    handleCloseUserItemFormModal()
  }

  return (
    <>
      <div className='modal'> 
      <form onSubmit={editUserItems} className="editForm">
        <label> Item:
          <br/>
          <input
            className="itemInfoInputBox"
            type="text"
            name="item_name"
            placeholder={item_name}
            onChange={handleItemEditChange}
            />
        </label>
          <br/>

        <label> Description:
          <br/>
          <input
            className="itemInfoInputBox"
            type="text"
            name="description"
            placeholder={description}
            onChange={handleItemEditChange}
            />
          </label>
          <br/>

          <label> Original Pricing:
          <br/>
          <input
            className="itemInfoInputBox"
            type="text"
            name="original_pricing"
            placeholder={original_pricing}
            onChange={handleItemEditChange}
            />
        </label>
          <br/>

          <label> Condition:
          <br/>
          <input
            className="itemInfoInputBox"
            type="text"
            name="condition"
            placeholder={condition}
            onChange={handleItemEditChange}
            />
        </label>
          <br/>

          <input
                className="editItemButton"
                type="submit"
                name="submit"
                value="Submit Changes"
            />
          
        <button className="editItemButton" onClick={handleCloseUserItemFormModal}> Cancel </button>
        </form>
      </div>
    </>
  )
}

export default EditItemModal