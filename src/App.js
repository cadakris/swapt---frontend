import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './home/Home'
import RequestPage from './requestpage/RequestPage';
import UserItemPage from './useritempage/UserItemPage';
import { toast} from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function App() {
  const [userItems, setUserItems] = useState({}) //grabbing the users, then grabbing the items
  const [showClickedItem, setShowClickedItem] = useState({})
  const [items, setItems] = useState([]) // displaying all items
  const [cart, setCart] = useState('')
  const [spin, setSpin] = useState('')
  const [money, setMoney] = useState(0)
  const [showEditForm, setShowEditForm] = useState(true)
  const [editUsersItem, setEditUsersItem] = useState({}) //This is for editimg a user's item
  const [showEditItemForm, setShowEditItemForm] = useState(true)
  const [itemClickedToEdit, setItemClickedToEdit] = useState({})

  useEffect(() => {
    fetch('http://localhost:9292/excludeuserloggedinitems')
        .then(res => res.json())
        .then(itemData => {
          setItems(itemData)
          })
}, [])

  useEffect(() => {  
    fetch('http://localhost:9292/userincludeitems')
      .then(res => res.json())
      .then(data => setUserItems(data))
},[])

const savedNotify =() => toast.dark(`You successfully swap't your item. You owe $${money}`)

//This function handles the actual trade when clicked
function handleRequest (item1, item2) {
  fetch(`http://localhost:9292/item/swap/${item1.id}/${item2.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    }
  })
 .then(resp => resp.json())
 .then(() => {
  // console.log(userItems.items)
  // let itemsTarget = userItems.items
  setItems(items.filter(item => item.id !== item1.id))
})
.then (() => {
  fetch('http://localhost:9292/userincludeitems')
  .then(res => res.json())
  .then(data => setUserItems(data))
})
// setUserItems(userItems.filter(item => item.id !== item1.id))
//  .then(() => {
//   setItems(items.filter(item => {
//     if(item.id === item1.id) {
//       return {...item, user_id: item2.user_id}
//     }
//   }))
// .then(() => {
//   setItems(items.filter(item => item.id !== item2.id))
// })
// .then(() => {
//   setUserItems({...userItems, items: userItems.items.map( item => {
//     if(item.id !== item1.id) {
//       return item2
//     }
//     else {
//       return item
//     }
//   })
// })
// })
//changed this part

//   setUserItems({...userItems, items: userItems.items.map( item => {
//     if(item.id === item1.id) {
//       return item2
//     }
//     else {
//       return item
//     }
//   })
// })
// })
savedNotify()
}

//Delete item
  function deleteItem(deletedItem) {
    fetch(`http://localhost:9292/itemdelete/${deletedItem.id}`, {
      method: "DELETE",
    })
      setUserItems({...userItems, items: userItems.items.filter(item => item.id !== deletedItem.id)})
  }

  //This edits the item when clicked

  return (
    <>
    <div className="logocontainer">
    <h1 className="mainHeader"> <img className="logoimage" src="https://images.squarespace-cdn.com/content/v1/5671782205f8e269f6f413a3/1629143864755-FN7KTQ3NG3YPCM11PQB7/Font+%281%29.png?format=300w"></img>SWAP'T</h1>
    </div>

    <Router>
    <Routes>
      <Route exact path='/' element={<Home showClickedItem={showClickedItem} setShowClickedItem={setShowClickedItem} items={items}/>}/>
      <Route path="/request" element={<RequestPage spin={spin} setSpin={setSpin} setMoney={setMoney} handleRequest={handleRequest} cart={cart} setCart={setCart} userItems={userItems} showClickedItem={showClickedItem} setShowClickedItem={setShowClickedItem}/>}/>
      <Route path ="/useritempage" 
        element={<UserItemPage 
        userItems={userItems} 
        setUserItems={setUserItems} 
        deleteItem={deleteItem} 
        items={items} 
        setItems={setItems} 
        setShowEditForm={setShowEditForm} 
        showEditForm={showEditForm} 
        setEditUsersItem={setEditUsersItem}
        setShowEditItemForm={setShowEditItemForm}
        showEditItemForm={showEditItemForm}
        setItemClickedToEdit={setItemClickedToEdit}
        itemClickedToEdit={itemClickedToEdit}
        />}
        />
    </Routes>
    </Router>

    </>
  )
}
export default App;

  