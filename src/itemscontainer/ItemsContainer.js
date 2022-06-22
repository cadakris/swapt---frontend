import React, { useEffect } from 'react';
import Item from '../item/Item';
import Modal from '../modal/Modal';
import './ItemsContainer.css'

function ItemsContainer({items, setShowClickedItem, showClickedItem, setToggleNewInfo}) {

  function closeModal() {
    setShowClickedItem({})
  }

  useEffect(() => {
    closeModal()
  },[])

  return (
    <div >
      <div className="itemContainer"> {items.map(item => {
        return <Item 
          key={item.id}
          item={item}
          setShowClickedItem={setShowClickedItem}
        />})}
      </div>
      { 
      showClickedItem.id? <Modal closeModal={closeModal} item={showClickedItem} setToggleNewInfo={setToggleNewInfo}/>
      : null
      }
    </div>
  )
}

export default ItemsContainer