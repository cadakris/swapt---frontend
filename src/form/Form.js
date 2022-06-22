import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import './Form.css'

function Form({addItem, setUserItems, userItems}){
    const [formState, setFormState] = useState({
        item_name: '',
        description: '',
        original_pricing: 0,
        condition: 0,
        user_id: 5
    }) 

    function handleSubmit(e){
        e.preventDefault()
        fetch('http://localhost:9292/itemsubmit', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                    item_name: formState.item_name,
                    description: formState.description,
                    original_pricing: formState.original_pricing,
                    condition: formState.condition,
                    image_url: formState.image_url,
                    user_id: formState.user_id
            })
        })
        .then(res => res.json())
        .then(newestItem => {
            console.log(newestItem)
            console.log("useritems", userItems)
            setUserItems({...userItems, items: [...userItems.items, newestItem]}) 
            // setUserItems(newestItem)
        })
        .then(() => {
            fetch('http://localhost:9292/userincludeitems')
            .then((res) => res.json())
            .then((newItem => setUserItems(newItem)))
        })
    }


    // .then((res) => res.json())
    // .then((data) => console.log(data))
    // .then(() => {
    //    fetch(`/users/${user.id}/days`)
    //   .then((res) => res.json())
    //   .then((completeDuplicateInfo) => {
    //     setColumnDays(completeDuplicateInfo)})
    // })
    // onDuplicateClick()
    // })

function handleChange(e){
    setFormState({...formState, [e.target.name]: e.target.value})
}

return (
    <>
    <h2 className="newItemTitle">Add New Item You Want to Swap</h2>
        <div className='new-item-form'>
            <form onSubmit={handleSubmit}>
            <div>
                <label className="label-form">Item:
                    <br />
                     <input className="input-Box" name="item_name" value={formState.item_name} onChange={handleChange}></input>   
                </label>
            </div>

            <div>
                <label className="label-form">Description
                    <br />
                    <input className="input-Box" name="description" value={formState.description} onChange={handleChange}></input>
                </label>
            </div>

            <div>
                <label className="label-form">Original Pricing: 
                    <br />
                    <input className="input-Box" name="original_pricing" value={formState.original_pricing} onChange={handleChange}></input>
                </label>
            </div>


            <div>       
                <label className="label-form">Condition: 
                    <br />
                    <input className="input-Box" name="condition" value={formState.condition} onChange={handleChange}></input>
                </label>
            </div>

            <div>
                <label className="label-form">Image URL: 
                    <br />
                <input className="input-Box" name="image_url" value={formState.image_url} onChange={handleChange}></input>
                </label>
            </div>

        <div>
            <input className="submitButton" type="submit" value="Submit"></input>
        </div>

        </form>
        </div> 
        </>
    )
}

export default Form;



