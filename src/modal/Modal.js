import React from 'react'
// import './Item.css'
import { useNavigate } from "react-router-dom";
import'./Modal.css'

// CSS for modal is in item.css

function Modal({item, closeModal}) {

    const navigate = useNavigate()

    const {item_name, description, original_pricing, condition, image_url} = item

    function handleRequestClick() {
        navigate("/request")
    }

    return (
        <div className='modal scroll'> 
            <div className='modal-content'> 
                <div className='bttndiv'>
                    <button id='bttn' onClick={closeModal}>X</button>
                </div>
                
                <div className='modal-img-container'>
                    <img className="image"src={image_url} alt={`item of ${item_name}`}/>
                </div>

                <div className='info-about-item'>
                    <h2 className="item-header">{item_name}</h2>
                    <p className="itemContet">Description:<br/> {description}</p>
                    <p className="itemContet">Original Price:<br/> ${original_pricing}</p>
                    <p className="itemContet">Condition:<br/> {condition}/10</p>
                </div>

                <div>
                <button className="tradingButton" onClick={handleRequestClick}>REQUEST A TRADE</button>
                </div>
          </div>
        </div>
    )
}

export default Modal;

