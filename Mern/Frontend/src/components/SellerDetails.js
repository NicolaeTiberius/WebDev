import React from 'react'
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

//hooks
import {useSellersContext} from '../hooks/useSellersContext'


const SellerDetails = ({seller}) => {

  const {dispatch} = useSellersContext()


  

  const handleClick = async () => {
    const response = await fetch('/api/sellers/'+ seller._id,{
      method: 'DELETE'
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type: 'DELETE_PRODUCT',payload: json})
    }

  }

  return (

    <div className='seller-details'>
    
        <h4>{seller.title}</h4>
        <p><strong>Price : </strong>£{seller.price}</p>
        <p><strong>Quantity: </strong>{seller.quantity}</p>
        <p><strong>Product Image:</strong></p>

        <p>{formatDistanceToNow(new Date(seller.createdAt),{addSuffix: true})}</p>
        <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}

export default SellerDetails