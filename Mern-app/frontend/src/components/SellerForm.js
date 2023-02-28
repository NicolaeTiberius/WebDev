import React, { useState } from 'react'
import axios from 'axios';
//hooks
import {useSellersContext} from '../hooks/useSellersContext'



const SellerForm = () => {
    const {dispatch} = useSellersContext()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    

    //For handling the images 
    const fileChangeHandler = (e) =>{
        setImage(e.target.files[0]);
    };

    const onSubmitImage = async  (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("image",image)
        
        //handle file data from the state before sending
        await fetch('/single',{
            method:"POST",
            body: data,
        })
            .then((result)=>{
                console.log("File sent successfully");
            })
            .catch((err)=>{
                console.log(err.message);
            });
    };


    const handleSubmit = async (e) => {
        e.preventDefault()

        const product = {title,price,quantity}

        const response = await fetch('/api/sellers',{
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setPrice('')
            setQuantity('')
            setError(null)
            setEmptyFields([])
            console.log('new product added',json)
            dispatch({type: 'CREATE_SELLER',payload: json})
        
        }
    }

  return (
    <>
    <form className='create' onSubmit={handleSubmit}>
          <h3>Add a new Product</h3>

          <label>Product name:</label>
          <input type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={emptyFields.includes('title') ? 'error' : ''} />

          <label>Product price: £</label>
          <input type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className={emptyFields.includes('price') ? 'error' : ''} />

          <label>Product quantity: </label>
          <input type="number"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              className={emptyFields.includes('quantity') ? 'error' : ''} />

          {/* <label>Product image: </label>
      <input onChange={(e)=>setImage(e.target.files[0])}  type="file"/> */}

          <button>Add Product</button>
          {error && <div className='error'>{error}</div>}
      </form>
    

      <form className='create' onSubmit={onSubmitImage} action="/single" method="POST" encType='multipart/form-data'>
      <h3>Add Image</h3>
        <input type="file" name="image" onChange={fileChangeHandler} />
        <button type="submit">Submit image</button>
      </form>


      </>


  )
}

export default SellerForm