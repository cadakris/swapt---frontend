import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './UserProfileModal.css'

function UserProfileModal({userItems, setUserItems, handleCloseModal, updateUserInfo}) { 

  const {bio, full_name, location, items, image} = userItems

  const [formState, setFormState]=useState({
    full_name: `${full_name}`,
    location: `${location}`,
    bio: `${bio}`,
    image: `${image}`,
    items: `${items}`
  })  

  //This function is setting state and adding in the user input values
  const handleProfileChange = (e) => {
    setFormState({...formState, [e.target.name]:e.target.value})
  }
  

  const editUserProfile = (e) => {
    e.preventDefault()
    fetch(`http://localhost:9292/edituserprofile/${userItems.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: formState.full_name,
        location: formState.location,
        bio: formState.bio, 
        image: formState.image,
        items:`${items}`
      })
    })
    .then(response => response.json())
    .then(updatedUserInfo => {
      console.log("setuseritems", setUserItems)
      // setUserItems({...userItems, updatedUserInfo})
      setFormState(updatedUserInfo)
    })
    .then(() => {
      // console.log(updatedUserInfo)
      fetch('http://localhost:9292/userincludeitems')
      .then((res) => res.json())
      .then((newUserInfo) => setUserItems(newUserInfo))
    })
    handleCloseModal()
    }

  return (
      <>
      <div className='modal'> 
        <form onSubmit={editUserProfile}className="editProfileForm">
            <label>Name:
            <br />
            <input 
              className="user-info-input-box" 
              type="text" 
              name="full_name" 
              placeholder={userItems.full_name}
              value={formState.full_name} 
              onChange={handleProfileChange}
              input/>
            </label>
            <br />

            <label>Bio:
            <br />
            <input 
              className="user-info-input-box" 
              type="text" 
              name="bio" 
              placeholder={userItems.bio}
              value={formState.bio} 
              onChange={handleProfileChange}/>
            </label>
            <br />

            <label>Location:
            <br />
            <input 
              className="user-info-input-box" 
              type="text" 
              name="location" 
              placeholder={userItems.location}
              value={formState.location} 
              onChange={handleProfileChange}/>
            </label>
            <br />

            <label>Image:
            <br />
            <input 
              className="user-info-input-box" 
              type="text" 
              name="image" 
              placeholder="Upload New Image"
              value={formState.image} 
              onChange={handleProfileChange}/>
            </label>
            <br />

            <input
                className="profileformbutton"
                type="submit"
                name="submit"
                value="Submit Changes"
                onClick={handleCloseModal}
            />

            <button className="profileformbutton" onClick={handleCloseModal}>Cancel</button>

        </form>
      </div>
      </>

  )
}

export default UserProfileModal