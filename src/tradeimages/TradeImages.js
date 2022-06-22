import React, {useState} from "react";
import './TradeImages.css'

function TradeImages({item, setCart, setSpin}) {
    function handleClick(){
        setCart(item)
        setSpin('https://media2.giphy.com/media/OlYhrN7KKv7JIekBPd/giphy.gif?cid=790b7611f9eb79aee3c3ba922435f5d07a6fb987f5d03128&rid=giphy.gif&ct=s')   
    }

return (
    <>
        <div className="imageCardContainer">
            <img className="test" src={item.image_url} alt="idk" onClick={handleClick}/>
        </div> 
    </> 

)}

export default TradeImages;