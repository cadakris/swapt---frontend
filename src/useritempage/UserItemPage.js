import React, { useState } from 'react'
import UserItems from '../useritems/UserItems'
import { useNavigate } from "react-router-dom";
import Form from '../form/Form';
import UserProfileModal from '../userprofilemodal/UserProfileModal';
import './UserItemPage.css'

function UserItemPage({userItems, deleteItem, items1, setItems, addItem, setUserItems, setShowEditForm, showEditForm, handleUserInfoEditClick, updateUserInfo}) {

  let navigate = useNavigate()

  const [showEditItem, setShowEditItem] = useState (true)

  const {bio, full_name, location, items, image} = userItems

  const mappedUserItems = items.map(item => {
    return <UserItems 
      key={item.id}
      item={item}
      deleteItem={deleteItem}
      showEditItem={showEditItem}
      setShowEditItem={setShowEditItem}
      userItems={userItems}
      setUserItems={setUserItems}
      handleEditItemClick={handleEditItemClick}
    />
  })
  
  function handleCloseModal () {
    setShowEditForm((showEditForm) => !showEditForm)
  }

  function handleUserInfoEditClick () {
    setShowEditForm((showEditForm) => !showEditForm)
  }

  function handleEditItemClick () {
    console.log("I am clicked")
    // setShowEditItem((showEditItem) => !showEditItem)
  }

    return (
      <>
        <div className="homeButtonContainer">
          <button className="backToHomeButton" onClick={() => navigate("/")}> BACK TO HOME </button>
        </div>

        {showEditForm? null: <UserProfileModal userItems={userItems} setUserItems={setUserItems} handleCloseModal={handleCloseModal} showEditForm={showEditForm} updateUserInfo={updateUserInfo}/>}

        <div className="userInfo">
          <img className="userImage" src={image} alt={full_name}></img>
          <h1>{full_name}</h1>
          <h3>Location: {location}</h3>
          <h3>Bio: {bio}</h3>
          <button className="editUserButton"onClick={handleUserInfoEditClick}>Edit Profile</button>
        </div>
            
        <div className="useritemspagecontainer">
          {mappedUserItems}
        </div>

        <Form items={items1} setItems={setItems} addItem={addItem} setUserItems={setUserItems} userItems={userItems}/>
      </>
    )
}

export default UserItemPage
