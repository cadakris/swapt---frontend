import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './RequestPage.css'
import { ToastContainer,toast} from 'react-toastify';
import TradeImages from '../tradeimages/TradeImages'
import 'react-toastify/dist/ReactToastify.css'


function RequestPage({ userItems, showClickedItem, setCart, cart, handleRequest, setMoney, setSpin, spin, toggleTradeItem}) {

    const [userInfo, setUserInfo] = useState({})
    const { bio, full_name, location, items, image } = userItems
    let navigate = useNavigate()

    //This is grabbing the information of the user we are trying to swap with
    useEffect(() => {
        fetch(`http://localhost:9292/users/${showClickedItem.user_id}`)
            .then(res => res.json())
            .then(userData => setUserInfo(userData))
    }, [])

    //This is mapping over the items and getting the user's item
    const mappedItems = items.map(item => {
        return <TradeImages
            key={item.id}
            item={item}
            setCart={setCart}
            setSpin={setSpin}
        />
    })

    return (
        <>
            <div className='home-button-container'>
            <button className='home-button' onClick={() => navigate("/")}> HOME </button>
            </div>

            
            <div className='product-card-container'>
                < div className = 'details' >
                    <h1 className='item-name'>{showClickedItem.item_name}</h1>
                    <p>Condition: {showClickedItem.condition}/10</p>
                    <p>Description: {showClickedItem.description}</p>
                </div>
                <div className='image-container'>
                    <p className='price'>Original Price: ${showClickedItem.original_pricing}</p>
                    <img className="selected-item" src={showClickedItem.image_url} alt='#{showClickedItem.item_name}' />
                </div> 
            </div>

            <div className='card-container'>
                <div className="user-card-container">
                    <div className='card-user-info-1'>
                        <h3>SWAP WITH </h3>
                        <h3>{userInfo.full_name}</h3>
                        <img className="userRequestPageImage" src={userInfo.image} alt='Item' />
                        <h3 className='title'>{userInfo.full_name}</h3>
                        <p>{userInfo.location}</p>
                        <p>Bio: {userInfo.bio}</p>
                    </div>
                </div>

                    <div className='cart-section'>
                        <h3>Select Item Below</h3>
                        <img className='traded-item' src={showClickedItem.image_url} alt='Item' />
                        {spin ? <img className='traded-item' src={spin} alt='spinner' /> : null}
                        {cart.id ? <img class='traded-item' src={cart.image_url} alt='' /> : null}
                        <div className='swap'>
                            <p>If you wish to offer $ on top of the swap, enter here</p>
                            <label>$
                                <input onChange={(e) => setMoney(e.target.value)}></input>
                            </label>
                            <h3>Press REQUEST SWAP to offer {userInfo.full_name} a swap</h3>
                            <button onClick={() => handleRequest(showClickedItem, cart)} className='request-bton'>REQUEST SWAP</button>
                        </div>
                    </div> 


                <div className="user-card-container">
                    <div className='card-user-info-2'>
                        <h3>Your Profile</h3> 
                        <h3>{full_name}</h3>
                        <div className="userImageContainer">
                            <img className="userRequestPageImage" src={image} alt="animjage" />
                        </div>
                        <h3 className='title'>{full_name}</h3>
                        <p>{location}</p>
                        <p>Bio: {bio}</p>
                    </div>
                </div>
            </div>

            <h1 className="userItemHeader">Choose An Item To Swap</h1>

            <div className="userItemsContainer">
                {mappedItems}
                <ToastContainer autoClose={1500} position="top-center" toastClassName="modifiedToast" />
            </div>
        </>
    )
}

export default RequestPage;